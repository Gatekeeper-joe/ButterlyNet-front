<template>
    <div class="index">
        <Navbar />
        <div class="manual-container col-md-8">
            <header>
                <h1 class="intro-head divider-bottom">
                    How to use
                </h1>
            </header>
            <section class="manual-section">
                <p class="mt-6 section-header">1.ユーザの新規作成</p>
                <p>メニューバーからユーザの作成フォームへ移動</p>
                <img src="~/assets/img/menubar.PNG" alt="" style="height: 120px;">
                <v-icon class="d-block arrow-icon">mdi-arrow-down-bold</v-icon>
                <img src="~/assets/img/registUser.PNG" alt="" style="height: 480px;">
                <p class="mt-4">ニックネームとパスワードを入力後「Submit」ボタンをクリック</p>
                <p>ユーザの登録に成功するとホーム画面(/workspace)に遷移します。</p>
                <v-icon class="d-block arrow-icon">mdi-arrow-down-bold</v-icon>
                <img src="~/assets/img/workspace.PNG" alt="" style="width: 640px;">
            </section>
            <section class="manual-section">
                <p class="mt-6 section-header">2.ページの更新確認</p>
                <img src="~/assets/img/menubar_registURL.PNG" alt="" style="height: 120px;">
                <v-icon class="d-block arrow-icon">mdi-arrow-down-bold</v-icon>
                <img src="~/assets/img/registURL.PNG" alt="" class="regist-url">
                <span>
                    <br>更新されたことを確認したいページのURLを登録します。
                </span>
                <span style="color: red;">※同じURLの登録はできません。</span>
                <p>
                    登録したページに変更があったことをButterfly.Netが認識した場合、
                    <nuxt-link to="/workspace">/workspace</nuxt-link>に
                    <br>先ほど登録したドメインがリンクとして表示されます。<br>
                </p>
                <img src="~/assets/img/updatedPage.PNG" alt="">
            </section>
            <section class="manual-section" style="margin-bottom: 60px;">
                <p class="mt-6 section-header">3.引継ぎ表作成</p>
                <p class="mt-4">
                    Butterfly.Netでは、表を使って簡単なチケット管理ができます。<br>
                    作成するには「New」ボタンをクリック
                </p>
                <img src="~/assets/img/handoffTable.PNG" alt="" style="width: 720px;">
                <p class="mt-4">
                    以下のダイアログが表示される。<br>
                    件名と本文を入力し、「Create」ボタンをクリック
                </p>
                <img src="~/assets/img/dialog.PNG" alt="" style="height: 320px;">
                <v-icon class="d-block arrow-icon my-5">mdi-arrow-down-bold</v-icon>
                <p>成功すると表に追加されます。</p>
                <img src="~/assets/img/after.PNG" alt="" style="width: 720px;">
                <img src="~/assets/img/tableDesc.PNG" alt="" class="table-desc">
                <p class="mt-4">
                    「Status」は「Open」の他に「Pending」「Close」とありますが、
                    それぞれ以下のような意味を持たせてあります。
                </p>
                <ul>
                    <li>
                        Open　→　チケットの内容がクリアされていない、一切手が付けられていない状態。
                    </li>
                    <li>
                        Pending　→　何らかの事情でチケットの対応を保留にしている状態。
                    </li>
                    <li>
                        Close　→　引き継がれた内容がクリアされ、対応終了した状態。
                    </li>
                </ul>
            </section>

        </div>
    </div>
</template>

<script>
    import Navbar from "~/components/Navbar"

    export default {
    components: {
        Navbar
    }
    }
</script>

<style>

    .manual-container {
        margin: 0 auto;
    }

    .intro-head {
        font-size: 3rem;
        font-family: cursive;
    }

    .section-header {
        margin-top: 32px !important;
        font-size: 2.5rem;
    }

    .arrow-icon {
        font-size: 36px;
        text-align: center;
        padding-right: 120px;
    }

    .manual-section {
        margin-top: 32px;
    }

    .table-desc {
        height: 184px;
        width: 720px;
        margin-top: 40px;
    }

    .regist-url {
        height: 208px;
        margin-bottom: 20px;
    }
</style>