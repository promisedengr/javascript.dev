<template>
    <div class="accountBlock-ava">
        <div class="accountBlock-title">
            Information
        </div>
        <div class="table-information">
            <div class="table-information_tr">
                <div class="table-information-tr-td">
                    My Coins
                </div>
                <div class="table-information-tr-td">
                    <div class="coin-block">
                        <i class="icon-coin coin-f"></i>
                        <span>{{$store.state.account.coin}}</span>
                        Coins
                    </div>
                </div>
            </div>
            <div class="table-information_tr">
                <div class="table-information-tr-td">
                    Server Name
                </div>
                <div class="table-information-tr-td">
                    <div class="coin-block">
                        <i class="icon-coin coin-s"></i>
                        <span v-if="$store.state.account.netType == 0">GLOBAL</span>
                        <span v-if="$store.state.account.netType == 1">SEA</span>
                        Server
                    </div>
                </div>
            </div>
            <div class="table-information_tr">
                <div class="table-information-tr-td">
                    Your IP
                </div>
                <div class="table-information-tr-td">
                    {{$store.state.account.user_ip}}
                </div>
            </div>
            <div class="table-information_tr">
                <div class="table-information-tr-td">
                    Email
                </div>
                <div class="table-information-tr-td">
                    {{$store.state.account.email}}
                </div>
            </div>
            <div class="table-information_tr">
                <div class="table-information-tr-td">
                    Mobile
                </div>
                <div class="table-information-tr-td">
                    {{$store.state.account.phoneNumber}}
                </div>
            </div>
            <!-- <div class="table-information_tr">
                <div class="table-information-tr-td">
                    Last login
                </div>
                <div class="table-information-tr-td">
                    2022-08222 17:34:00
                </div>
            </div> -->
            <!-- <div class="table-information_tr">
                <div class="table-information-tr-td">
                    Country
                </div>
                <div class="table-information-tr-td">
                    Ecuador
                </div>
            </div>
            <div class="table-information_tr">
                <div class="table-information-tr-td">
                    My credits
                </div>
                <div class="table-information-tr-td">
                    <span class="color-green-y">$1000.00</span>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script></script>