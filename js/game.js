/*
//カードをとるなど、全体像から先に関数を作るところから始めてみる。

◆ゲームの流れ
・スタートボタンを押す
・カードを配る
・カードを引くか(ヒット)、そのままにするか（スタンド）を選ぶ
・スタンドを選んだら、ディーラーが17点以上になるまでカードを引く
・勝敗判定
・リスタート
*/
'use strict';
//事前準備
//定数の設定
const deck = [];
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const d1 = document.getElementById("d1");
const d2 = document.getElementById("d2");
const hit = document.getElementById("hit");
const stand = document.getElementById("stand");
const result = document.getElementById("result");
const dealerResult = document.getElementById("dealer-result");

//カードの配列の作成
  //cardsという名前の関数宣言(ただし宣言しただけでは使えない)
  //関数の引数は、呼び出し時の関数()の()内に記載したものに置き換わる。

  const cards = suit =>{
    for (let n = 1; n <= 13; n++){//1~13の数字を作成
      let face = (suit + n);//スート(suit)＋数字(n)をまとめる為の変数face
      deck.push(face);//配列deckに変数faceの内容(スート+数字)を追加する
    }
  }

  //スートを作成して、変数suitに代入し、関数cardsに渡す
  //
  //例「suit + n」＝「♥1」と表示されるイメージ
  for(let s = 1; s <= 4; s++){
    if(s === 1){
      cards('♠')//s = 1 の時は♠+数字
    }else if(s === 2){
    cards('♣');//s = 2 の時は♣+数字
    }else if(s === 3){
      cards('♥');//s = 3 の時は♥+数字
    }else if(s === 4){
      cards('♦');//s = 4 の時は♦+数字
    }
  }

  //配列deckに各スートの1~13が格納される

//スタートボタンを押すと発火
  document.getElementById('start').addEventListener('click', () => {
    //カードを配る
    //ディーラーとプレイヤーに配列deckからランダムに要素を配る
    const dealerCard1 = Math.floor(Math.random() * deck.length);
    const dealerCard2 = Math.floor(Math.random() * deck.length);
    const playerCard1 = Math.floor(Math.random() * deck.length);
    const playerCard2 = Math.floor(Math.random() * deck.length);

    //カードに配った要素を表示する
    d1.innerHTML = deck[dealerCard1];
    d2.innerHTML = deck[dealerCard2];
    p1.innerHTML = deck[playerCard1];
    p2.innerHTML = deck[playerCard2];

    //初期手配の合計点を出す
    //手配から数字だけを切り出す
    let dl1num = Number(deck[dealerCard1].replace(/[^0-9]/g, ''));
    let dl2num = Number(deck[dealerCard2].replace(/[^0-9]/g, ''));
    let pl1num = Number(deck[playerCard1].replace(/[^0-9]/g, ''));
    let pl2num = Number(deck[playerCard2].replace(/[^0-9]/g, ''));

    const nowdlCard = [dl1num, dl2num];
    const nowplCard = [pl1num, pl2num];

    //初期手札の点数確認をする。2~9はそのまま、10~13は10点、1は11点
    if(dl1num >= 10){
      dl1num = 10;
    }else if(dl1num === 1){
      dl1num = 11;
    }

    if(dl2num >= 10){
      dl2num = 10;
    }else if(dl2num === 1){
      dl2num = 11;
    }

    if(pl1num >= 10){
      pl1num = 10;
    }else if(pl1num === 1){
      pl1num = 11;
    }

    if(pl2num >= 10){
      pl2num = 10;
    }else if(pl2num === 1){
      pl2num = 11;
    }

    //初期手札の合計点をプレイヤー側だけresultに表示する
    result.textContent = pl1num + pl2num;

  })

//追加のカードを引く
  //ヒットをクリックした時の処理
  document.getElementById('hit').addEventListener('click', () => {
    
  });