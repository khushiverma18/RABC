function minStickers(stickers, target) {
    const memo = new Map();
    memo.set("", 0);

    const stickerMaps = stickers.map(sticker => {
        const count = new Array(26).fill(0);
        for (let ch of sticker) {
            count[ch.charCodeAt(0) - 97]++;
        }
        return count;
    });

    function helper(remain) {
        if (memo.has(remain)) return memo.get(remain);

        const targetCount = new Array(26).fill(0);
        for (let ch of remain) {
            targetCount[ch.charCodeAt(0) - 97]++;
        }

        let min = Infinity;

        for (let sticker of stickerMaps) {
            if (sticker[remain.charCodeAt(0) - 97] === 0) continue;

            let newRemain = "";

            for (let i = 0; i < 26; i++) {
                if (targetCount[i] > 0) {
                    let count = targetCount[i] - sticker[i];
                    for (let k = 0; k < Math.max(0, count); k++) {
                        newRemain += String.fromCharCode(i + 97);
                    }
                }
            }

            const res = helper(newRemain);
            if (res !== -1) {
                min = Math.min(min, 1 + res);
            }
        }

        memo.set(remain, min === Infinity ? -1 : min);
        return memo.get(remain);
    }

    return helper(target);
}

// 🔥 IMPORTANT: function call
const stickers = ["with", "example", "science"];
const target = "thehat";

const result = minStickers(stickers, target);

// 🔥 PRINT OUTPUT
console.log("Answer:", result);