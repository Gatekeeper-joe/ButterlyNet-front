<template>
    <div class="col-md-7">
        <div class="card mt-5">
            <div class="card-header card-text">ユーザ登録</div>

            <div class="card-body">
                <form method="POST" @submit.prevent="regist">
                    <div class="form-group row">
                        <label for="nickname" class="col-md-4 col-form-label text-md-right card-text">ニックネーム</label>
                        <div class="col-md-6">
                            <input id="nickname" type="text" class="form-control" :class="validation.failure.nn ? 'is-invalid': null" name="nickname" required autocomplete="nickname" autofocus v-model="auth.nickname"  ref="inputNickname">
                            <span class="invalidFeedback" v-if="validation.failure.nn">
                                <strong >{{ validation.messages.nickname[0] }}</strong>
                            </span>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="password" class="col-md-4 col-form-label text-md-right card-text">パスワード</label>

                        <div class="col-md-6">
                            <!--入力値の条件を吹き出しで出すときの処理。いったん凍結中。<input id="password" type="password" class="form-control" :class="validation.failure.pwd ? 'is-invalid': null" name="password" required autocomplete="current-password" v-model="auth.password" @focus="display" @blur="hidden"> -->
                            <input id="password" type="password" class="form-control" :class="validation.failure.pwd ? 'is-invalid': null" name="password" required autocomplete="current-password" v-model="auth.password">
                            <span class="invalidFeedback" v-if="validation.failure.pwd">
                                <strong >{{ validation.messages.password[0] }}</strong>
                            </span>
                            <div class="speech-bubble">
                                <p class="">Foo baa</p>
                            </div>
                        </div>
                        <!-- <p class="speech-bubble" v-if="focus">Foo baa</p> -->

                    </div>

                    <div class="form-group row justify-content-center">
                        <div class="col-md-8 mt-3">
                            <div class="mb-2">
                                <span>※ニックネームは他のユーザと同一のものは使用できません</span>
                            </div>
                            <div class="mb-1">
                                <span>※パスワードは以下の条件をすべて満たしてください</span>
                            </div>
                            <ul>
                                <li>
                                    <span class="conditions">8文字以上30文字以下</span>
                                </li>
                                <li>
                                    <span class="conditions">アルファベット大文字小文字使用</span>
                                </li>
                                <li>
                                    <span class="conditions">0～9までの数字を1つ以上使用</span>
                                </li>
                                <li>
                                    <span class="conditions">(!#$%)←の記号のうち1つ以上使用</span>
                                </li>
                                <li>
                                    <span class="conditions">上記全て半角入力</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="form-group row mb-0 form-lower-part">
                        <div class="col-md-8 offset-md-4">
                            <button type="submit" class="btn btn-primary">
                                登録
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios')

export default {
    head() {
        return {
            title: 'ユーザ登録'
        }
    },

    data() {
        return {
            processing :false,
            focus: false,

            auth: {
                nickname : '',
                password : '',
                error :false
            },

            validation: {
                messages: '',
                failure: {
                    nn: false,
                    pwd: false
                },
            },
        }
    },

    methods: {
        regist() {
            this.auth.error = false
            this.processing = true
            try {
                this.$axios.$post('/registUser', { data: this.auth })
                .then((res)=>{
                    this.validation.messages = res

                    if (this.validation.messages === 1) {
                        try {
                            this.$auth.loginWith('User', { data: this.auth })
                            .then((res)=>{
                                this.result = res
                            })
                        } catch (err) {
                            this.result = err
                            this.processing = false
                        }
                    }

                    if (this.validation.messages.nickname) {
                        this.validation.failure.nn = true
                    }

                    if (this.validation.messages.password) {
                        this.validation.failure.pwd = true
                    }
                })
            } catch (err) {
                this.auth.error = true
                this.processing = false
            }
        },

        display() {
            this.focus = true;
        },

        hidden() {
            this.focus = false;
        }
    },

    mounted() {
        //autofocusを有効にする
        this.$nextTick(() => this.$refs.inputNickname.focus())
    }
}
</script>

<style>
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.4rem;
}

.card-body {
    flex: 1 1 auto;
    min-height: 1px;
    padding: 2rem;
}

.card-text {
    font-size: 1.1em;
}

.card-link:hover {
    text-decoration: none;
}

.card-link + .card-link {
    margin-left: 1.25rem;
}

.card-header {
    padding: 1.2rem 2rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, 0.03);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
}

.card-header:first-child {
    border-radius: calc(0.4rem - 1px) calc(0.4rem - 1px) 0 0;
}

.card-footer {
    padding: 1.2rem 2rem;
    background-color: rgba(0, 0, 0, 0.03);
    border-top: 1px solid rgba(0, 0, 0, 0.125);
}

.card-footer:last-child {
    border-radius: 0 0 calc(0.4rem - 1px) calc(0.4rem - 1px);
}

.card-header-tabs {
    margin-right: -1.0rem;
    margin-bottom: -1.2rem;
    margin-left: -1.0rem;
    border-bottom: 0;
}

.card-header-pills {
    margin-right: -1.0rem;
    margin-left: -1.0rem;
}

.card-deck .card {
    margin-bottom: 15px;
}

@media (min-width: 576px) {
    .card-deck {
        display: flex;
        flex-flow: row wrap;
        margin-right: -15px;
        margin-left: -15px;
    }

    .card-deck .card {
        flex: 1 0 0%;
        margin-right: 15px;
        margin-bottom: 0;
        margin-left: 15px;
    }
}

.card-columns .card {
    margin-bottom: 0.75rem;
}

@media (min-width: 576px) {
    .card-columns {
        -moz-column-count: 3;
        column-count: 3;
        -moz-column-gap: 1.25rem;
        column-gap: 1.25rem;
        orphans: 1;
        widows: 1;
    }

    .card-columns .card {
        display: inline-block;
        width: 100%;
    }
}

.accordion {
    overflow-anchor: none;
}

.accordion > .card {
    overflow: hidden;
}

.accordion > .card:not(:last-of-type) {
    border-bottom: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.accordion > .card:not(:first-of-type) {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

.accordion > .card > .card-header {
    border-radius: 0;
    margin-bottom: -1px;
}

.invalidFeedback {
    width: 100%;
    margin-top: 0.25rem;
    font-size: 1.3rem;
    color: #e3342f;
}

.form-control {
    display: block;
    width: 100%;
    height: calc(1.95em + 1.2rem + 2px);
    padding: 0.6rem 1.2rem;
    font-size: 1.44rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.4rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

@media (prefers-reduced-motion: reduce) {
    .form-control {
        transition: none;
    }
}

.form-control::-ms-expand {
    background-color: transparent;
    border: 0;
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #a1cbef;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(52, 144, 220, 0.25);
}

.form-control::-moz-placeholder {
    color: #6c757d;
    opacity: 1;
}

.form-control:-ms-input-placeholder {
    color: #6c757d;
    opacity: 1;
}

.form-control::placeholder {
    color: #6c757d;
    opacity: 1;
}

.form-control:disabled,
.form-control[readonly] {
    background-color: #e9ecef;
    opacity: 1;
}

input[type="date"].form-control,
input[type="time"].form-control,
input[type="datetime-local"].form-control,
input[type="month"].form-control {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

select.form-control:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #495057;
}

select.form-control:focus::-ms-value {
    color: #495057;
    background-color: #fff;
}

.form-control-file,
.form-control-range {
    display: block;
    width: 100%;
}

.form-lower-part {
    margin-top: 16px;
}

.form-control.is-invalid {
    border-color: #e3342f;
    padding-right: calc(1.6em + 0.75rem);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23e3342f' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23e3342f' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(0.4em + 0.1875rem) center;
    background-size: calc(0.8em + 0.375rem) calc(0.8em + 0.375rem);
}

.was-validated .form-control:invalid:focus,
.form-control.is-invalid:focus {
  border-color: #e3342f;
  box-shadow: 0 0 0 0.2rem rgba(227, 52, 47, 0.25);
}

.was-validated textarea.form-control:invalid,
textarea.form-control.is-invalid {
  padding-right: calc(1.6em + 0.75rem);
  background-position: top calc(0.4em + 0.1875rem) right calc(0.4em + 0.1875rem);
}

.was-validated .custom-select:invalid,
.custom-select.is-invalid {
  border-color: #e3342f;
  padding-right: calc(0.75em + 2.3125rem);
  background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='4' height='5' viewBox='0 0 4 5'%3e%3cpath fill='%23343a40' d='M2 0L0 2h4zm0 5L0 3h4z'/%3e%3c/svg%3e") right 0.75rem center/8px 10px no-repeat, #fff url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23e3342f' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23e3342f' stroke='none'/%3e%3c/svg%3e") center right 1.75rem/calc(0.8em + 0.375rem) calc(0.8em + 0.375rem) no-repeat;
}

.was-validated .custom-select:invalid:focus,
.custom-select.is-invalid:focus {
  border-color: #e3342f;
  box-shadow: 0 0 0 0.2rem rgba(227, 52, 47, 0.25);
}

.was-validated .form-check-input:invalid ~ .form-check-label,
.form-check-input.is-invalid ~ .form-check-label {
  color: #e3342f;
}

.was-validated .form-check-input:invalid ~ .invalid-feedback,
.was-validated .form-check-input:invalid ~ .invalid-tooltip,
.form-check-input.is-invalid ~ .invalid-feedback,
.form-check-input.is-invalid ~ .invalid-tooltip {
  display: block;
}

.was-validated .custom-control-input:invalid ~ .custom-control-label,
.custom-control-input.is-invalid ~ .custom-control-label {
  color: #e3342f;
}

.was-validated .custom-control-input:invalid ~ .custom-control-label::before,
.custom-control-input.is-invalid ~ .custom-control-label::before {
  border-color: #e3342f;
}

.was-validated .custom-control-input:invalid:checked ~ .custom-control-label::before,
.custom-control-input.is-invalid:checked ~ .custom-control-label::before {
  border-color: #e9605c;
  background-color: #e9605c;
}

.was-validated .custom-control-input:invalid:focus ~ .custom-control-label::before,
.custom-control-input.is-invalid:focus ~ .custom-control-label::before {
    box-shadow: 0 0 0 0.2rem rgba(227, 52, 47, 0.25);
}

.was-validated .custom-control-input:invalid:focus:not(:checked) ~ .custom-control-label::before,
.custom-control-input.is-invalid:focus:not(:checked) ~ .custom-control-label::before {
  border-color: #e3342f;
}

.was-validated .custom-file-input:invalid ~ .custom-file-label,
.custom-file-input.is-invalid ~ .custom-file-label {
  border-color: #e3342f;
}

.was-validated .custom-file-input:invalid:focus ~ .custom-file-label,
.custom-file-input.is-invalid:focus ~ .custom-file-label {
  border-color: #e3342f;
  box-shadow: 0 0 0 0.2rem rgba(227, 52, 47, 0.25);
}

.btn {
    display: inline-block;
    font-weight: 400;
    color: #212529;
    text-align: center;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.6rem 1.2rem;
    font-size: 1.44rem;
    line-height: 1.6;
    border-radius: 0.4rem;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-link {
    font-weight: 400;
    color: #3490dc;
    text-decoration: none;
}

@media (prefers-reduced-motion: reduce) {
    .btn {
        transition: none;
    }
}

.btn:focus,
.btn.focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(52, 144, 220, 0.25);
}

.btn.disabled,
.btn:disabled {
    opacity: 0.65;
}

.btn:not(:disabled):not(.disabled) {
    cursor: pointer;
}

a.btn.disabled,
fieldset:disabled a.btn {
    pointer-events: none;
}

.btn-primary {
    color: #fff;
    background-color: #3490dc;
    border-color: #3490dc;
}

.btn-primary:hover {
    color: #fff;
    background-color: #227dc7;
    border-color: #2176bd;
}

.btn-primary:focus,
.btn-primary.focus {
    color: #fff;
    background-color: #227dc7;
    border-color: #2176bd;
    box-shadow: 0 0 0 0.2rem rgba(82, 161, 225, 0.5);
}

.btn-primary.disabled,
.btn-primary:disabled {
    color: #fff;
    background-color: #3490dc;
    border-color: #3490dc;
}

.btn-primary:not(:disabled):not(.disabled):active,
.btn-primary:not(:disabled):not(.disabled).active,
.show > .btn-primary.dropdown-toggle {
    color: #fff;
    background-color: #2176bd;
    border-color: #1f6fb2;
}

.btn-primary:not(:disabled):not(.disabled):active:focus,
.btn-primary:not(:disabled):not(.disabled).active:focus,
.show > .btn-primary.dropdown-toggle:focus {
    box-shadow: 0 0 0 0.2rem rgba(82, 161, 225, 0.5);
}

/* .speech-bubble {
    position: relative;
    display: inline-block;
    background-color: #fff;
    border: solid 1px #525252;
    padding: 16px;
    min-width: 240px;
    max-width: 100%;
    text-align: center;
}
.speech-bubble:before,
.speech-bubble:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
}
.speech-bubble:before {
    border: solid 1px transparent;
    border-top: solid 12px #525252;
}
.speech-bubble:after {
    border: solid 14px transparent;
    border-top: solid 14px #fff;
    margin-top: -5px;
}
.speech-bubble p {
    margin: 0;
    padding: 0;
} */

.speech-bubble-indicator {
    visibility: hidden
}

.speech-bubble-pointer {
    position: absolute;
    top: 37px;
    right: -13px;
    content: '';
    width: 10px;
    height: 10px;
    background-color: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    transform: rotateZ(45deg)
}

.speech-bubble {
    position: absolute;
    top: 22px;
    right: -248px;
    z-index: 1;
    width: 240px;
    height: 200px
}

.speech-bubble:before {
    content: '';
    width: 240px;
    height: 20px;
    position: absolute;
    background-color: #fff;
    top: 0;
    left: 0;
    border-bottom-left-radius: 15px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    z-index: -1
}

.speech-bubble .speech-bubble-content {
    background-color: #fff;
    padding: 16px;
    z-index: 1
}

.speech-bubble:after {
    content: '';
    width: 240px;
    height: 192px;
    position: absolute;
    background-color: #fff;
    bottom: -11px;
    left: 0;
    border-top-left-radius: 15px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    z-index: -1
}

.speech-bubble .strength-progress .strength-progress-background {
    stroke: #282828;
    opacity: .1
}

.speech-bubble .strength-progress .strength-progress-foreground.is-short,.speech-bubble .strength-progress .strength-progress-foreground.is-weak {
    stroke: #f62f2f
}

.speech-bubble .strength-progress .strength-progress-foreground.is-fair {
    stroke: #fdb432
}

.speech-bubble .strength-progress .strength-progress-foreground.is-strong {
    stroke: #26b47f
}

.speech-bubble .strength-title {
    font-size: 12px;
    opacity: .6;
    color: #000;
    display: inline;
    float: left;
    font-weight: 800
}

.speech-bubble .strength-description {
    font-size: 12px;
    text-align: left;
    line-height: 2;
    color: grey
}

.speech-bubble .strength-text {
    display: inline;
    float: left;
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    color: #f62f2f;
    margin-left: 10px;
    margin-right: 10px
}

.speech-bubble .strength-text.is-short,.speech-bubble .strength-text.is-weak {
    color: #f62f2f
}

.speech-bubble .strength-text.is-fair {
    color: #fdb432
}

.speech-bubble .strength-text.is-strong {
    color: #26b47f
}

</style>