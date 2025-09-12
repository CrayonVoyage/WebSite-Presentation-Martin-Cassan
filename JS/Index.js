// 2048 game implementation scoped to the experiments page
// Runs only if #game-2048 exists to avoid impacting other pages

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('game-2048');
    if (!root) return; // Do nothing on pages without the game container

    const size = 4;
    let grid = createEmptyGrid(size);
    let score = 0;

    const gridEl = document.getElementById('grid');
    const scoreEl = document.getElementById('score');
    const btnNew = document.getElementById('new-game');
    const btnUp = document.getElementById('btn-up');
    const btnDown = document.getElementById('btn-down');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    // Build cells once
    buildCells(gridEl, size);

    // Start game
    newGame();

    // Controls
    btnNew.addEventListener('click', newGame);
    btnUp.addEventListener('click', () => handleMove('up'));
    btnDown.addEventListener('click', () => handleMove('down'));
    btnLeft.addEventListener('click', () => handleMove('left'));
    btnRight.addEventListener('click', () => handleMove('right'));

    document.addEventListener('keydown', (e) => {
      const key = e.key;
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
        e.preventDefault();
        const dir = key.replace('Arrow', '').toLowerCase();
        handleMove(dir);
      }
    });

    function newGame() {
      grid = createEmptyGrid(size);
      score = 0;
      addRandomTile(grid);
      addRandomTile(grid);
      render();
    }

    function handleMove(direction) {
      const { moved, newGrid, gained } = moveGrid(grid, direction);
      if (!moved) return;
      grid = newGrid;
      score += gained;
      addRandomTile(grid);
      render();
      if (isGameOver(grid)) {
        setTimeout(() => alert('Game over!'), 10);
      }
    }

    function render() {
      scoreEl.textContent = String(score);
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const cell = getCellEl(gridEl, r, c);
          const val = grid[r][c];
          cell.textContent = val ? String(val) : '';
          cell.className = 'cell' + (val ? ` v${val}` : ' empty');
        }
      }
    }
  });

  // Helpers
  function createEmptyGrid(n) {
    return Array.from({ length: n }, () => Array(n).fill(0));
  }

  function buildCells(container, n) {
    container.innerHTML = '';
    container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const d = document.createElement('div');
        d.className = 'cell empty';
        d.dataset.r = String(r);
        d.dataset.c = String(c);
        container.appendChild(d);
      }
    }
  }

  function getCellEl(container, r, c) {
    return container.querySelector(`.cell[data-r="${r}"][data-c="${c}"]`);
  }

  function addRandomTile(g) {
    const empties = [];
    for (let r = 0; r < g.length; r++) {
      for (let c = 0; c < g.length; c++) {
        if (g[r][c] === 0) empties.push([r, c]);
      }
    }
    if (empties.length === 0) return false;
    const [r, c] = empties[Math.floor(Math.random() * empties.length)];
    g[r][c] = Math.random() < 0.9 ? 2 : 4;
    return true;
  }

  function moveGrid(g, dir) {
    let grid = g.map(row => row.slice());
    let gained = 0;

    const rotate = (m) => m[0].map((_, c) => m.map(row => row[c])); // transpose
    const reverseRows = (m) => m.map(row => row.slice().reverse());

    const slideAndMergeRowLeft = (row) => {
      const filtered = row.filter(v => v !== 0);
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] !== 0 && filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          gained += filtered[i];
          filtered[i + 1] = 0;
          i++; // skip next
        }
      }
      const compacted = filtered.filter(v => v !== 0);
      while (compacted.length < row.length) compacted.push(0);
      return compacted;
    };

    if (dir === 'left') {
      grid = grid.map(slideAndMergeRowLeft);
    } else if (dir === 'right') {
      grid = reverseRows(grid).map(slideAndMergeRowLeft);
      grid = reverseRows(grid);
    } else if (dir === 'up') {
      grid = rotate(grid).map(slideAndMergeRowLeft);
      grid = rotate(grid); // transpose back
    } else if (dir === 'down') {
      grid = rotate(grid);
      grid = reverseRows(grid).map(slideAndMergeRowLeft);
      grid = reverseRows(grid);
      grid = rotate(grid);
    }

    const moved = !gridsEqual(g, grid);
    return { moved, newGrid: grid, gained };
  }

  function gridsEqual(a, b) {
    for (let r = 0; r < a.length; r++) {
      for (let c = 0; c < a.length; c++) {
        if (a[r][c] !== b[r][c]) return false;
      }
    }
    return true;
  }

  function isGameOver(g) {
    // If any empty, not over
    for (let r = 0; r < g.length; r++) {
      for (let c = 0; c < g.length; c++) {
        if (g[r][c] === 0) return false;
      }
    }
    // If any move possible
    const dirs = ['left', 'right', 'up', 'down'];
    for (const d of dirs) {
      if (moveGrid(g, d).moved) return false;
    }
    return true;
  }
})();

