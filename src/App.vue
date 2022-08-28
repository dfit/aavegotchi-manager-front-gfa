<template>
  <v-app>
  <v-container>
    <v-container md12 xs12>
      <v-row>
        <v-col md3>
          <span>Wallet address <br> {{userAddressFormatted}} </span>
        </v-col>
        <v-col md3>
          <span>Best Aavegotchi Guild <br> <a href='https://thegotchifarmy.org/'>Gotchi FArmy Gang</a></span>
        </v-col>
        <v-col md3>
          <span>Github sources <br> <a href='https://github.com/dfit/aavegotchi-manager-front-gfa'>aavegotchi-manager-front-gfa</a></span>
        </v-col>
        <v-col md3>
          <span>Manager creator <br> <a href='https://twitter.com/soulk__'>https://twitter.com/soulk__</a></span>
        </v-col>
      </v-row>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-row>
        <v-col md12>
          <v-card outlined >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  Discord Aavegotchi Manager
                </v-list-item-title>
                <v-list-item-subtitle>Hey frens this page will explain how the aavegotchi-manager work and guide you to the process of auto-petting and managing your lendings. </v-list-item-subtitle>

              </v-list-item-content>

              <v-list-item-avatar
                  tile
                  size="80"
              >
                <v-img
                    alt="gfa"
                    src="https://thegotchifarmy.org/wp-content/uploads/2021/08/cropped-gotchyfarmy_blason_contour-1-71x71.png"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-divider></v-divider>
            <v-card-text>
              <p></p>
              <p>You will have to perform 4 steps (2 optionnal) to make it work : </p>
              <p>- Get your GFA insignia to have access to reserved channels</p>
              <p>- Join the discord app to be able to use commands -> Reach for <strong><a href='https://discord.com/channels/860545589640822804/958258506065133578'>#lendings</a></strong> channel -> Use command <strong>/register your-wallet-address</strong></p>
              <p>- (Optionnal) Use the <strong>Pet authorization</strong> panel on this page to allow the bot to perform auto-petting actions on your gotchi(s)</p>
              <p>- (Optionnal) Use the <strong>Lending authorization</strong> panel on this page to allow the bot to perform lendings actions on your gotchi(s) (listing, unlisting, claiming)</p>
              <p>You can review all available command by clicking on the button below</p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                  text
                  color="teal accent-4"
                  @click="reveal = true"
              >
                CLIck to reveal available commands
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <v-card
                  v-if="reveal"
                  class="transition-fast-in-fast-out v-card--reveal"
                  style="height: 100%;"
              >
                <v-card-text class="pb-0">
                  <v-card-title class="text-h5 mb-1">User Management</v-card-title>
                  <v-card-text class="text-left">
                    <p><strong>/register-user</strong> : Register the user to be able to use commands</p>
                    <p><strong>/delete-user</strong> : Unsubscribe from the gotchi manager</p>
                  </v-card-text>
                </v-card-text>
                <v-card-text class="pb-0">
                  <v-card-title class="text-h5 mb-1">User Informations</v-card-title>
                  <v-card-text class="text-left">
                    <p><strong>/user-parameters</strong> : Get current lending parameters for the user</p>
                    <p><strong>/news</strong> : Get news about current managed gotchis / parcels</p>
                    <p><strong>/toggle-news</strong> : Activate or deactivate news about current managed gotchis / parcels</p>
                    <p><strong>/inspect</strong> : Inspect an other user wallet</p>
                  </v-card-text>
                </v-card-text>
                <v-card-text class="pb-0">
                  <v-card-title class="text-h5 mb-1">Lending Management</v-card-title>
                  <v-card-text class="text-left">
                    <p><strong>/resume-lending</strong> : Start or restart lending for all gotchis managed</p>
                    <p><strong>/stop-lending</strong> : Stop all lending and cancel current listing</p>
                    <p><strong>/update-lending-options</strong> : Change all gotchis lending parameters</p>
                    <p><strong>/update-third-party</strong> : Update the third party address</p>
                    <p><strong>/update-whitelist</strong> : Update the whitelist id</p>
                    <p><strong>/toggle-lending-channelable</strong> : Stop or resume all lending for gotchi that have channel available</p>
                  </v-card-text>
                </v-card-text>
                <v-card-actions class="pt-0">
                  <v-btn
                      text
                      color="teal accent-4"
                      @click="reveal = false"
                  >
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if='activated'>
          <v-select
              :items="items"
              v-model="operatorAddress"
              label="OPERATOR ADDRESS"
              disabled='true'
          ></v-select>
      </v-row>
      <v-row v-if='activated'>
        <v-col md6>
          <v-card outlined >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  Lending authorization
                </v-list-item-title>
                <v-list-item-subtitle>Authorize the bot to manage your lendings based on your own settings</v-list-item-subtitle>
                <v-list-item-subtitle><strong>Your gotchi need to be in your wallet and not borrowed to appears in this list</strong></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar
                  tile
                  size="80"
              >
                <v-img
                    alt="lending"
                    src="https://app.aavegotchi.com/images/lending/iconMid.svg"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-data-table
                v-model="selectedGotchis"
                :headers="headers"
                :items="userGotchis"
                item-key="id"
                show-select
                class="elevation-1"
            >
            </v-data-table>

            <v-card-actions>
              <v-btn
                  outlined
                  rounded
                  text
                  :disabled='userGotchis.length === 0 || selectedGotchis.filter(gotchi => gotchi.isLendingOperator).length === selectedGotchis.length'
                  v-on:click='authorizeLending'
              >
                Authorize
              </v-btn>
              <v-btn
                  outlined
                  rounded
                  text
                  :disabled='userGotchis.length === 0 || selectedGotchis.filter(gotchi => !gotchi.isLendingOperator).length === selectedGotchis.length'
                  v-on:click='revokeLending'
              >
                Revoke
              </v-btn>

            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md6>
          <v-card outlined >
            <v-list-item three-line>
              <v-list-item-content>
                <v-list-item-title class="text-h5 mb-1">
                  Pet authorization
                </v-list-item-title>
                <v-list-item-subtitle>Authorize the bot to take care of your gotchi</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-avatar
                  tile
                  size="80"
              >
                <v-img
                    alt="petting"
                    src="https://wiki.aavegotchi.com/kinship/petgotchi.gif"
                ></v-img>
              </v-list-item-avatar>
            </v-list-item>
            <v-card-text>
              <div v-if='isPetOperatorSet'>You already validated the transaction to accept the pet operator ! Good job ! :)</div>
              <div v-if='!isPetOperatorSet'>You need to accept the transction to let the manager pet your gotchi !</div>
            </v-card-text>
            <v-card-actions>
              <v-btn
                  outlined
                  rounded
                  text
                  :disabled='isPetOperatorSet'
                  v-on:click='authorizePetting'
              >
                Authorize
              </v-btn>
              <v-btn
                  outlined
                  rounded
                  text
                  :disabled='!isPetOperatorSet'
                  v-on:click='revokePetting'
              >
                Revoke
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
const Web3 = require('web3');
let web3 = new Web3(Web3.givenProvider);
import diamondcontract from "./data/diamondcontract"
import aavegotchimanagercontract from '@/data/aavegotchimanagercontract';
import ghstcontract from '@/data/ghstcontract';

export default {
  name: 'App',
  data() {
    return {
      web3: web3,
      reveal: false,
      items: [{
        text: "Gotchi FArmy - operator address - 0x5472bD3Bc79319c6A30660cb9006eA00f08Dbe3B",
        value: "0x5472bD3Bc79319c6A30660cb9006eA00f08Dbe3B"
      }],
      selectedGotchis: [],
      headers: [
        { text: 'Id', value: 'id'},
        { text: 'Name', value: 'name' },
        { text: 'Kinship', value: 'kinship' },
        { text: 'BRS', value: 'baseRarityScore' },
        { text: 'isLendingOperator', value: 'isLendingOperator' }
      ],
      operatorAddress: "0x5472bD3Bc79319c6A30660cb9006eA00f08Dbe3B",
      operatorPanel : {
        petOperator: true,
        lendingOperator: true
      },
      numberOfNftHold: 0,
      allowanceGhst: "0",
      isPetOperatorSet: false,
      userAddress: "Not Connected",
      userAddressFormatted: "Not Connected",
      userGotchis: [],
      activated: false,
      aavegotchiContract: new web3.eth.Contract(diamondcontract.abi, diamondcontract.smartContractAddress),
      aavegotchiManagerContract: new web3.eth.Contract(aavegotchimanagercontract.abi, aavegotchimanagercontract.smartContractAddress),
      ghstContract: new web3.eth.Contract(ghstcontract.abi, ghstcontract.smartContractAddress),
      nftPrice: "20"
    }
  },
  async mounted() {
    let account = await web3.eth.requestAccounts()
    if(account && account.length > 0) {
      this.userAddress = account.pop().toLowerCase()
    }
    setInterval(this.updateUserAccount, 1000);
    setInterval(this.watchAavegotchiAccount, 30000);
  },
  watch: {
    userAddress() {
      this.userGotchis = []
      this.userAddressFormatted = this.userAddress === "Not Connected" ? this.userAddress : `${this.userAddress.substring(0, 5)}...${this.userAddress.substring(38)}`
      this.isPetOperatorSet = false
      if (this.userAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
        this.activated = true;
        this.isPetOperator()
        this.loadGotchisList()
        this.allowedGhstSpending()
        this.getUserNft()
      } else {
        this.activated = false;
      }
    }
  },
  methods: {
    async updateUserAccount() {
      let account = await web3.eth.requestAccounts()
      if (account.length > 0 && account[0].toLowerCase() !== this.userAddress) {
        this.userAddress = account[0].toLowerCase()
      }
    },
    watchAavegotchiAccount() {
      this.isPetOperator()
      this.loadGotchisList()
      this.allowedGhstSpending()
      this.getUserNft()
    },
    async isPetOperator() {
      this.isPetOperatorSet = await this.aavegotchiContract.methods.isPetOperatorForAll(this.userAddress,
          this.operatorAddress).call()
    },
    isLendingOperator(gotchiId) {
      return this.aavegotchiContract.methods.isLendingOperator(this.userAddress,
          this.operatorAddress, gotchiId).call()
    },
    authorizeLending() {
      const gotchiToAuthorizeLendingOperation = this.selectedGotchis.filter(gotchi => !gotchi.isLendingOperator)
      this.aavegotchiContract.methods.batchSetLendingOperator(this.operatorAddress,gotchiToAuthorizeLendingOperation.map(gotchi => [gotchi.id, true])).send({ from: this.userAddress })
      this.selectedGotchis = []
    },
    revokeLending() {
      const gotchiToRevokeLendingOperation = this.selectedGotchis.filter(gotchi => gotchi.isLendingOperator)
      this.aavegotchiContract.methods.batchSetLendingOperator(this.operatorAddress,gotchiToRevokeLendingOperation.map(gotchi => [gotchi.id, false])).send({ from: this.userAddress })
      this.selectedGotchis = []
    },
    authorizePetting() {
      this.aavegotchiContract.methods.setPetOperatorForAll(this.operatorAddress,
          true).send({ from: this.userAddress })
    },
    revokePetting() {
      this.aavegotchiContract.methods.setPetOperatorForAll(this.operatorAddress,
          false).send({ from: this.userAddress })
    },
    authorizeGhstSpending() {
      this.ghstContract.methods.approve(aavegotchimanagercontract.smartContractAddress, web3.utils.toWei(this.nftPrice)).send({ from: this.userAddress })
    },
    revokeGhstSpending() {
      this.ghstContract.methods.decreaseAllowance(aavegotchimanagercontract.smartContractAddress, this.allowanceGhst).send({ from: this.userAddress })
    },
    async allowedGhstSpending() {
      this.allowanceGhst = await this.ghstContract.methods.allowance(this.userAddress,
          aavegotchimanagercontract.smartContractAddress).call()
    },
    mintNft() {
      this.aavegotchiManagerContract.methods.mint(this.userAddress,1, 0).send({ from: this.userAddress })
    },
    async getUserNft() {
      this.numberOfNftHold = await this.aavegotchiManagerContract.methods.balanceOf(this.userAddress).call()
    },
    async loadGotchisList() {
      const query = `query getGotchiFromWallets {
        aavegotchis(where: {originalOwner_: {id_in: ["${this.userAddress}"]}}) {
          id
          name
          kinship
          baseRarityScore
        }
      }`
      let gotchisOfOwner = (await axios.post("https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic", { query: query })).data.data?.aavegotchis
      let userGotchis = []
      if (gotchisOfOwner !== null && gotchisOfOwner !== undefined ) {
        for(const gotchi of gotchisOfOwner) {
          gotchi["isLendingOperator"] = await this.isLendingOperator(gotchi.id)
          userGotchis.push(gotchi)
        }
      }
      this.userGotchis = userGotchis
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
