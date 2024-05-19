//ブラックジャックができるサイトを作る
// カード枚数は52枚。ジョーカーは含めない。カードの重複が無いように山札を構築する。
// プレイヤー、ディーラーの一対一で対戦するものとし、以下の挙動を取る
// 初期設定として、プレイヤー・ディーラーが交互に1枚ずつ山札からカードを取り手札とする。
// プレイヤーからは自分の手札すべてと、ディーラーの1枚めの手札が確認できる。（ディーラーの2枚目移行の手札はわからない）

// 手札はAが1ポイント、2-10がそれぞれ2-10ポイント、J/Q/Kが10ポイントとして計算される。

// プレイヤーは手札を1枚追加するか、しないかを選択できる。
// 手札を追加した場合、21ポイントを超えるとバーストとなり、ゲームに敗北する。
// プレイヤーはバーストするか、好きなタイミングで止めるまで手札にカードを追加できる。
// ディーラーは手札の合計ポイントが17以上になるまで山札を引き続ける。
// ディーラーの手札が21ポイントを超えた場合、バーストしてプレイヤーの勝利。
// ディーラーの手札が18以上21以下になったとき次の段階に移行する。

// プレイヤー・ディーラーの手札のポイントを比較して、大きいほうが勝利。
// ダブルダウンやスプリットなどの特殊ルールは無し。


'use strict';

const deck = [];
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const d1 = document.getElementById("d1");
const d2 = document.getElementById("d2");
const hit = document.getElementById("hit");
const stand = document.getElementById("stand");
const result = document.getElementById("result");
const dealerResult = document.getElementById("dealer-result");

//deckにマークと1~13の数字をつけて配列
const cards = mark => {
  for(let i = 1; i < 14; i++){
    let card = (mark + i);
    deck.push(card);//push：配列の末尾に指定された要素を追加
  }
}

//マークを作成し関数cardsに渡す
for(let m = 1; m < 5; m++){
  if(m === 1){
    cards("♠");
  }else if(m === 2){
    cards("♣");
  }else if(m === 3){
    cards("♥");
  }else if(m === 4){
    cards("♦");
  }
}


//手札を配る
function deal(hand1,hand2){
  //配列(deck)からランダムでカードを切り取る
  const tramp1 = deck.splice(Math.floor(Math.random()*deck.length),1)[0];
  const tramp2 = deck.splice(Math.floor(Math.random()*deck.length),1)[0];
  //splice：既存の要素を取り除いたり、置き換えたり、新しい要素を追加し配列を変更
  //Math.floor() 関数は与えられた数値以下の最大の整数を返す（小数点以下切り捨て）
  //Math.random()0 以上 1 未満 (0 は含むが、 1 は含まない) の範囲で浮動小数点の擬似乱数を返します。

  //カードを表示
  hand1.textContent = tramp1;
  hand2.textContent = tramp2;
  //テキストの書き込み

  //数字のみを切り取り、文字列から数値に変換
  let hand1Num = Number(tramp1.replace(/[^0-9^\.]/g,""));
  let hand2Num = Number(tramp2.replace(/[^0-9^\.]/g,""));
  //g	global	2番目、3番目... にマッチする部分も検索する

  //hand1の数字をチェック（checkAceANdJack等の関数化していい気がする）
  //10・11･12･13を10点　1も10点と数える
  if(hand1Num >= 10){
    hand1Num = 10;
  }else if(hand1Num === 1){
    hand1Num = 11;
  }

  //hand2の数字チェック
  if(hand2Num >= 10){
    hand2Num = 10;
  }else if(hand2Num ===1 && hand1Num !== 11){
    //!== 値が違うか型が違えばOKの扱い
    hand2Num = 11;
  }

  //配列で管理する
  return[hand1Num, hand2Num];

}

//配列を定数に代入する
const hands1 = deal(p1,p2)
const hands2 = deal(d1,d2)

//配列内の合計（手札の合計）
const sumHand = hands =>{
  let sum = 0;
  for(let i = 0, len = hands.length; i <len; i++){
    sum += hands[i];
  }
  return sum;
};

result.textContent = sumHand(hands1);

//カードを引く処理
function drowCard(who,hands){
  const drow = document.createElement("div");

  //引くカードをランダムで作成し表示させる
  drow.classList.add("card-front");
  drow.textContent = deck.splice(Math.floor(Math.random() * deck.length),1)[0];
  who.appendChild(drow);


//引いたカードを数値化
let drowNum = (Number(drow.textContent.replace(/[^0-9^\.]/g,"")));

//10以上か１かを判定
if (drowNum >= 10){
  drowNum = 10;
  return drowNum;
} else if(drowNum === 1 && sumHand(hands) <= 10){
  drowNum = 11;
  return drowNum;
}

return drowNum;
};

//ヒットボタンを押した時
hit.addEventListener('click', () =>{
  const player = document.getElementById('player');
  hands1.push(drowCard(player, hands1));
  result.textContent = sumHand(hands1);

  //21以上かを判定
  isBurst(hands1, result,'プレイヤー');

});

//21以上かを判定
function isBurst(hands, res, who){
  if(sumHand(hands) > 21){
    if(hands[0] === 11){
      hands[0] = 1;
      res.textContent = sumHand(hands);
    } else if(hands[1] === 11){
      hands[1] = 1;
      res.textContent = sumHand(hands);
    } else{
      res.textContent = `${sumHand(hands)}:burst!${who}の負けです`
      d1.className = 'card-front'
      dealerResult.textContent = sumHand(hands2);
      NoneBtn()
    }
    }
  }

function NoneBtn(){
  hit.style.display = 'none';
  stand.style.display = 'none';
};

//スタンドボタンを押した時
stand.addEventListener('click', ()=>{
  d1.className = 'card-front'
  dealerResult.textContent = sumHand(hands2);

  const dealer = document.getElementById('dealer');

//手札合計が17以上になるまでカードを引く
while (sumHand(hands2) <= 16) {
  hands2.push(drowCard(dealer,hands2));
  dealerResult.textContent = sumHand(hands2);
}

//手札が21以上かを判定
isBurst(hands2,dealerResult,'ディーラー');

//勝敗判定
if(sumHand(hands2) <= 21){
  if(sumHand(hands1) > sumHand(hands2)){
    result.textContent = `${sumHand(hands1)}:プレイヤーWIN!!`
    dealerResult.textContent = `${sumHand(hands2)}:ディーラーLOSE...`
    NoneBtn()
  }else if(sumHand(hands2) > sumHand(hands1)){
    result.textContent = `${sumHand(hands1)}:プレイヤーLOSE...`
    dealerResult.textContent = `${sumHand(hands2)}:ディーラーWIN!!`
    NoneBtn()
} else{
  result.textContent = `${sumHand(hands1)}:DRAW..`
  dealerResult.textContent = `${sumHand(hands2)}:DRAW..`
  NoneBtn()
}
  }else{
    result.textContent = `${sumHand(hands1)}:プレイヤーWIN!!`
    NoneBtn()
  };

});


