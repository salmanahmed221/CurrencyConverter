#!/usr/bin/env node
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function Welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Welcome to the Currency Converter"
  );
  await sleep();
  rainbowTitle.stop();
}

await Welcome();

async function CurrencyConverter() {
  const data: { yourCurrency: string; Amount: number; targetCurrency: string } =
    await inquirer.prompt([
      {
        name: "yourCurrency",
        type: "list",
        message: "Select your Currency ?",
        choices: ["PKR", "USD", "EUR"],
      },
      {
        name: "Amount",
        type: "number",
        message: "Enter the Amount ?",
        when(answer) {
          return answer.yourCurrency;
        },
      },
      {
        name: "targetCurrency",
        type: "list",
        message: "Select your Targeted Currency ?",
        choices: ["PKR", "USD", "EUR"],
        when(answer) {
          return answer.Amount;
        },
      },
    ]);
  const { yourCurrency, Amount, targetCurrency } = data;
  let PkrtoDollar: number = 0.0044;
  let DollartoPkr: number = 225.27;
  let PkrtoEuro: number = 0.0042;
  let EurotoPkr: number = 237.43;
  let DollartoEuro: number = 0.95;
  let EurotoDollar: number = 1.05;

  if (yourCurrency === "PKR" && targetCurrency === "USD") {
    console.log(`${Amount} Rs is equal to ${Amount * PkrtoDollar} Dollars`);
  } else if (yourCurrency === "USD" && targetCurrency === "PKR") {
    console.log(`${Amount} Dollars is equal to ${Amount * DollartoPkr} Rs`);
  } else if (yourCurrency === "PKR" && targetCurrency === "PKR") {
    console.log(`${Amount} Rs is equal to ${Amount * 1} Rs`);
  } else if (yourCurrency === "PKR" && targetCurrency === "EUR") {
    console.log(`${Amount} Rs is equal to ${Amount * PkrtoEuro} Euros`);
  } else if (yourCurrency === "EUR" && targetCurrency === "PKR") {
    console.log(`${Amount} Euros is equal to ${Amount * EurotoPkr} Rs`);
  } else if (yourCurrency === "USD" && targetCurrency === "EUR") {
    console.log(`${Amount} Dollars is equal to ${Amount * DollartoEuro} Euros`);
  } else if (yourCurrency === "EUR" && targetCurrency === "USD") {
    console.log(`${Amount} Euros is equal to ${Amount * EurotoDollar} Dollars`);
  } else if (yourCurrency === "USD" && targetCurrency === "USD") {
    console.log(`${Amount} Dollars is equal to ${Amount * 1} Dollars`);
  } else if (yourCurrency === "EUR" && targetCurrency === "EUR") {
    console.log(`${Amount} Euros is equal to ${Amount * 1} Euros`);
  }
}

async function StartAgain() {
  do {
    await CurrencyConverter();
    var que = await inquirer.prompt([
      {
        name: "restart",
        type: "input",
        message: "Do you wan to Continue? y or n",
        default: false,
      },
    ]);
  } while (que.restart === "y");
}

await StartAgain();
