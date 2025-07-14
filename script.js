        document.addEventListener('DOMContentLoaded', () => {
            const board = document.getElementById('board');
            const status = document.getElementById('status');
            const resetBtn = document.getElementById('reset-btn');
            const newGameBtn = document.getElementById('new-game-btn');
            const playerX = document.getElementById('player-x');
            const playerO = document.getElementById('player-o');
            
            let currentPlayer = 'X';
            let gameActive = true;
            let gameState = ['', '', '', '', '', '', '', '', ''];
            const winningConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Baris
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Kolom
                [0, 4, 8], [2, 4, 6]             // Diagonal
            ];
            
            // Membuat papan permainan
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-index', i);
                cell.addEventListener('click', handleCellClick);
                board.appendChild(cell);
            }
            
            // Fungsi untuk menangani klik sel
            function handleCellClick(event) {
                const cell = event.target;
                const index = parseInt(cell.getAttribute('data-index'));
                
                // Cek apakah sel sudah terisi atau permainan tidak aktif
                if (gameState[index] !== '' || !gameActive) {
                    return;
                }
                
                // Update game state dan tampilan
                gameState[index] = currentPlayer;
                cell.textContent = currentPlayer;
                cell.classList.add(currentPlayer.toLowerCase());
                
                // Cek kemenangan atau seri
                checkGameResult();
            }
            
            // Fungsi untuk memeriksa hasil permainan
            function checkGameResult() {
                let roundWon = false;
                
                // Cek setiap kondisi kemenangan
                for (let i = 0; i < winningConditions.length; i++) {
                    const [a, b, c] = winningConditions[i];
                    const valA = gameState[a];
                    const valB = gameState[b];
                    const valC = gameState[c];
                    
                    if (valA === '' || valB === '' || valC === '') {
                        continue;
                    }
                    
                    if (valA === valB && valB === valC) {
                        roundWon = true;
                        
                        // Animasi sel yang menang
                        document.querySelector(`.cell[data-index="${a}"]`).classList.add('winning-cell');
                        document.querySelector(`.cell[data-index="${b}"]`).classList.add('winning-cell');
                        document.querySelector(`.cell[data-index="${c}"]`).classList.add('winning-cell');
                        
                        break;
                    }
                }
                
                // Jika ada pemenang
                if (roundWon) {
                    status.textContent = `Pemain ${currentPlayer} Menang!`;
                    gameActive = false;
                    highlightCurrentPlayer();
                    return;
                }
                
                // Cek apakah permainan seri
                const isDraw = !gameState.includes('');
                if (isDraw) {
                    status.textContent = 'Permainan Seri!';
                    gameActive = false;
                    return;
                }
                
                // Ganti pemain
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                status.textContent = `Giliran Pemain ${currentPlayer}`;
                highlightCurrentPlayer();
            }
            
            // Fungsi untuk menyoroti pemain yang sedang bermain
            function highlightCurrentPlayer() {
                if (currentPlayer === 'X') {
                    playerX.classList.add('active');
                    playerO.classList.remove('active');
                } else {
                    playerO.classList.add('active');
                    playerX.classList.remove('active');
                }
            }
            
            // Fungsi untuk mereset permainan
            function resetGame() {
                gameState = ['', '', '', '', '', '', '', '', ''];
                gameActive = true;
                currentPlayer = 'X';
                status.textContent = 'Giliran Pemain X';
                
                // Reset tampilan sel
                document.querySelectorAll('.cell').forEach(cell => {
                    cell.textContent = '';
                    cell.classList.remove('x', 'o', 'winning-cell');
                });
                
                highlightCurrentPlayer();
            }
            
            // Fungsi untuk memulai permainan baru
            function newGame() {
                resetGame();
            }
            
            // Event listener untuk tombol
            resetBtn.addEventListener('click', resetGame);
            newGameBtn.addEventListener('click', newGame);
            
            // Inisialisasi pemain aktif
            highlightCurrentPlayer();
        });