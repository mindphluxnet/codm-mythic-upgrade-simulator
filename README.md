# Mythic Upgrade Simulator for Call of Duty Mobile
This script simulates pulls from the Mythic Upgrade crate and outputs the average cost. It's the same script I used to obtain the values used to create the [Mythic Upgrade Calculator](https://codm.gg/mythic-upgrade-calculator) on CODM.GG

# Requirements

Node.js v12.x.x

# Installation

    git clone https://github.com/mindphluxnet/codm-mythic-upgrade-simulator
    cd codm-mythic-upgrade-simulator
    npm install

# Usage

All options can be set using the command line or simply left at default values. Options are:

    -p, --price <value>: Set single pull price in CP. Default: 160 CP.
    -t, --target <value>: Sets the target upgrade level between 1 and 8. Default = 8 (max)
    -c, --cost <value>: Set the real-money price for the largest CP pack (10800 CP). Default: 99.99 USD
    -r, --runs <value>: Set the number of simulations to run. Default = 100000

For example, if you want to simulate 10000 runs with target level 3 at a CP price of 120 per pull, you'd use:

    node index.js -r 10000 -t 3 -p 120

# Acknowledgements

* Uses [Chance.js](https://chancejs.com) by Victor Quinn
* Uses [Minimist](https://github.com/substack/minimist) by Substack

# License

MIT