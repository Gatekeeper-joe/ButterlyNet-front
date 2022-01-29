<template>
    <div class="workspace">
        <Navbar />
        <div class="a-dashboard d-flex mt-5">
            <div class="col-md-7">
                <span class="mt-3">reserved</span>
            </div>
            <div class="col-md-6">
                <div class="h-table-content">
                    <table>
                        <tbody>
                            <tr>
                                <td></td>
                                <th>Updated pages</th>
                                <th>Updated time</th>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>www.google.com</td>
                                <td>2022/1/29 00:00:00</td>
                            </tr>
                                                        <tr>
                                <td>1</td>
                                <td>www.google.com</td>
                                <td>2022/1/29 00:00:00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Navbar from "~/components/Navbar"
    import Bookmark from "~/components/Bookmark"

    export default {
        components: {
            Navbar,
            Bookmark
        },

        middleware: ['auth'],

        head() {
            return {
                title: 'ホーム'
            }
        },

        data() {
            return {
            }
        },

        // beforeRouteEnter(to, from, next) {
        //     next(vm => {
        //         vm.prevRoute = from;
        //     })
        // },

        // mounted() {
        //     if (this.prevRoute.path === '/registUser') {
        //         this.message = 'ユーザ登録が完了しました。' + "\n" + '最高の体験があなたを待っています(小並感)';
        //         alert(this.message);
        //     }
        // },
    }
</script>

<style>
    table {
        width: auto;
        border-spacing: 0;
        font-size:14px;
    }
    table th {
        color: #fff;
        padding: 8px 15px;
        background: #258;
        background:-moz-linear-gradient(rgba(34,85,136,0.7), rgba(34,85,136,0.9) 50%);
        background:-webkit-gradient(linear, 100% 0%, 100% 50%, from(rgba(34,85,136,0.7)), to(rgba(34,85,136,0.9)));
        font-weight: normal;
        border-left:1px solid #258;
        border-top:1px solid #258;
        border-bottom:1px solid #258;
        line-height: 100%;
        text-align: center;
        text-shadow:0 -1px 0 rgba(34,85,136,0.9);
        box-shadow: 0px 1px 1px rgba(255,255,255,0.3) inset;
    }
    table th:first-child {
        border-radius: 5px 0 0 0;
    }
    table th:last-child {
        border-radius:0 5px 0 0;
        border-right:1px solid #258;
        box-shadow: 2px 2px 1px rgba(0,0,0,0.1),0px 1px 1px rgba(255,255,255,0.3) inset;
    }
    table tr td {
        padding: 5px 40px;
        border-bottom: 1px solid #84b2e0;
        border-left: 1px solid #84b2e0;
        text-align: center;
    }
    table tr td:last-child {
        border-right: 1px solid #84b2e0;
        box-shadow: 2px 2px 1px rgba(0,0,0,0.1);
    }
    table tr {
        background: #fff;
    }
    table tr:nth-child(2n+1) {
        background: #f1f6fc;
    }
    table tr:last-child td {
        box-shadow: 2px 2px 1px rgba(0,0,0,0.1);
    }
    table tr:last-child td:first-child {
        border-radius: 0 0 0 5px;
    }
    table tr:last-child td:last-child {
        border-radius: 0 0 5px 0;
    }
</style>