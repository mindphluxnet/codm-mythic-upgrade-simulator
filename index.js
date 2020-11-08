const chances = [1, 2, 4, 8, 35, 50];
const loot = [80, 50, 40, 30, 20, 10];
const levels = [0, 60, 160, 360, 900, 990, 1100, 1360, 2000];

const Chance = require("chance");
var argv = require("minimist")(process.argv.slice(2));
const chance = new Chance();

console.log("CODM Mythic Upgrade Simulator v1 - (c) 2020, CODM.GG (https://codm.gg)");

var singlePrice = 160;

if (argv.h || argv.help) {
  console.log("Command line parameters:");
  console.log("-h --help: Display this help");
  console.log("-p --price: Set single pull price in CP. Default: 160 CP.");
  console.log(
    "-t --target: Sets the target upgrade level between 1 and 8. Default = 8 (max)"
  );
  console.log(
    "-c --cost: Set the real-money price for the largest CP pack (10800 CP). Default: 99.99"
  );
  console.log(
    "-r --runs: Set the number of simulations to run. Default = 100000"
  );
  process.exit();
}

if (argv.p == undefined && argv.price == undefined) {
  console.log(
    `No pull price supplied. Using default price of ${singlePrice} CP per pull.`
  );
} else {
  if (parseInt(argv.p)) {
    singlePrice = argv.p;
  } else if (parseInt(argv.price)) {
    singlePrice = argv.price;
  }
  console.log(`Pull price set to ${singlePrice} CP`);
}

const packPrice = singlePrice * 0.9 * 10;

var targetLevel = 8;

if (argv.t == undefined && argv.target == undefined) {
  console.log(`No target level supplied. Using default target level of 8`);
} else {
  if (argv.t) {
    targetLevel = argv.t;
  } else if (argv.target) {
    targetLevel = argv.target;
  }
  console.log(`Target level set to ${targetLevel}`);
}

const target = levels[targetLevel];

var runs = 100000;

if (argv.r == undefined && argv.runs == undefined) {
  console.log(
    `No number of simulation run supplied. Using default value of ${runs}`
  );
} else {
  if (argv.r) {
    runs = argv.r;
  } else if (argv.runs) {
    runs = argv.runs;
  }
  console.log(`Number of simulation runs set to ${runs}`);
}

var cost = 99.99;

if (argv.c == undefined && argv.cost == undefined) {
  console.log(`No real-money cost specified. Using default value of ${cost}.`);
} else {
  if (argv.c) {
    cost = parseFloat(argv.c);
  } else if (argv.cost) {
    cost = parseFloat(argv.cost);
  }
  console.log(`Real-money cost set to ${cost}`);
}

const cpPrice = cost / 10800;

var cardsPulled = 0;
var pull = 1;
var spentCP = 0;
var totalCP = 0;
var totalPulls = 0;
var run = 0;

function PullTen() {
  var tmp = 0;
  for (i = 0; i < 10; i++) {
    tmp += PullOne();
  }
  return tmp;
}

function PullOne() {
  var cardAmount = chance.weighted(loot, chances);
  return cardAmount;
}

function Simulate() {
  while (cardsPulled < target) {
    if (target - cardsPulled >= 10) {
      // if we don't need more than 10 cards, only buy one pack instead of 10
      cardsPulled += PullOne();
      pull++;
      totalPulls++;
      spentCP += singlePrice;
    } else {
      cardsPulled += PullTen();
      pull += 10;
      totalPulls += 10;
      spentCP += packPrice;
    }

    // bad luck protection

    if (pull == 20) {
      cardsPulled += 75;
    }
    if (pull == 50) {
      cardsPulled += 125;
    }
    if (pull == 100) {
      cardsPulled += 200;
    }
  }
  process.stdout.write(
    `Run #${run}     Pulls: ${pull}    Cards: ${cardsPulled}   Spent CP: ${spentCP}\x1B[0G`
  );
  return spentCP;
}

while (run < runs) {
  cardsPulled = 0;
  pull = 0;
  run++;
  spentCP = 0;
  totalCP += Simulate();
}
var avgCP = totalCP / runs;
var avgPulls = totalPulls / runs;

console.log(
  `Simulation complete. Average pulls: ${avgPulls.toFixed(
    2
  )} Average CP spent: ${avgCP.toFixed(2)} worth ~currency ${(
    avgCP * cpPrice
  ).toFixed(2)}                   `
);
