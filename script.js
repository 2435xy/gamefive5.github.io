document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    let currentPlayer = "black";
    const cells = [];

    // 创建棋盘格子
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", handleCellClick);
            board.appendChild(cell);
            cells.push(cell);
        }
    }

    function handleCellClick(event) {
        const cell = event.target;
        if (!cell.classList.contains("black-stone") && !cell.classList.contains("white-stone")) {
            const stoneClass = currentPlayer === "black" ? "black-stone" : "white-stone";
            cell.classList.add(stoneClass);
            currentPlayer = currentPlayer === "black" ? "white" : "black";
            if (checkWin(cell.dataset.row, cell.dataset.col, stoneClass)) {
                setTimeout(() => alert(`${stoneClass === "black-stone" ? "黑" : "白"}棋获胜！`), 100);
                cells.forEach(cell => cell.removeEventListener("click", handleCellClick));
            }
        }
    }

    function checkWin(row, col, stoneClass) {
        const directions = [
            [0, 1], [1, 0], [1, 1], [-1, 1] // 水平、垂直、两个对角线方向
        ];

        function countStonesInDirection(dx, dy) {
            let count = 0;
            let r = +row, c = +col; // "+"用于将字符串转换为数字
            while (true) {
                r += dx;
                c += dy;
                const cell = cells.find(cell => cell.dataset.row == r && cell.dataset.col == c);
                if (!cell || !cell.classList.contains(stoneClass)) {
                    break;
                }
                count++;
            }
            return count;
        }

        for (const [dx, dy] of directions) {
            const count1 = countStonesInDirection(dx, dy);
            const count2 = countStonesInDirection(-dx, -dy); // 反方向
            if (count1 + count2 >= 4) {
                return true; // 胜利
            }
        }

        return false; // 未胜利
    }
});
