<template>
    <div class="col-md-7">
        <div class="card mt-5">
            <div class="card-header card-text">ログイン</div>

            <div class="card-body">
                <form method="POST" @submit.prevent="login">
                    <div class="form-group row">
                        <label for="nickname" class="col-md-4 col-form-label text-md-right card-text">ニックネーム</label>

                        <div class="col-md-6">
                            <input id="nickname" type="text" class="form-control" name="nickname" required autocomplete="nickname" autofocus v-model="auth.nickname">
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="password" class="col-md-4 col-form-label text-md-right card-text">パスワード</label>

                        <div class="col-md-6">
                            <input id="password" type="password" class="form-control" name="password" required autocomplete="current-password" v-model="auth.password">
                        </div>
                    </div>

                    <div class="form-group row justify-content-center">
                        <div class="col-md-6">
                            <span class="invalidfeedback" v-if="validation.messages">
                                <strong>メールアドレスまたはパスワードが違います</strong>
                            </span>
                        </div>
                    </div>

                    <div class="form-group row mb-0 form-lower-part">
                        <div class="col-md-8 offset-md-4">
                            <button type="submit" class="btn btn-primary">
                                ログイン
                            </button>

                            <nuxt-link class="btn btn-link" to="reset" v-bind:disabled="processing">
                                パスワードを忘れた場合
                            </nuxt-link>
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
            title: "ログイン"
        }
    },
    data() {
        return {
            processing :false,
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
        async login() {
            this.auth.error = false
            this.processing = true
            try {
                this.$auth.loginWith('User', { data: this.auth })
                .then((res)=>{
                    this.result = res
                })
            } catch (err) {
                this.processing = false
            }
        }
    }
}
</script>

<style>
body {
    margin: 0;
    font-family: "Nunito", sans-serif;
    font-size: 1.44rem;
    font-weight: 400;
    line-height: 1.6;
    color: #212529;
    text-align: left;
    background-color: #fefefe;
}

main {
    display: block;
}

.py-4 {
    padding-bottom: 2.4rem !important;
    padding-top: 2.4rem !important;
}

.col-xl, .col-xl-auto, .col-xl-12, .col-xl-11, .col-xl-10, .col-xl-9, .col-xl-8, .col-xl-7, .col-xl-6, .col-xl-5, .col-xl-4, .col-xl-3, .col-xl-2, .col-xl-1, .col-lg, .col-lg-auto, .col-lg-12, .col-lg-11, .col-lg-10, .col-lg-9, .col-lg-8, .col-lg-7, .col-lg-6, .col-lg-5, .col-lg-4, .col-lg-3, .col-lg-2, .col-lg-1, .col-md, .col-md-auto, .col-md-12, .col-md-11, .col-md-10, .col-md-9, .col-md-8, .col-md-7, .col-md-6, .col-md-5, .col-md-4, .col-md-3, .col-md-2, .col-md-1, .col-sm, .col-sm-auto, .col-sm-12, .col-sm-11, .col-sm-10, .col-sm-9, .col-sm-8, .col-sm-7, .col-sm-6, .col-sm-5, .col-sm-4, .col-sm-3, .col-sm-2, .col-sm-1, .col, .col-auto, .col-12, .col-11, .col-10, .col-9, .col-8, .col-7, .col-6, .col-5, .col-4, .col-3, .col-2, .col-1 {
    position: relative;
    padding-right: 15px;
    padding-left: 15px;
}

.col-md-8 {
    flex: 0 0 66.66666667%;
    max-width: 66.66666667%;
}

*, *::before, *::after {
    box-sizing: border-box;
}

.form-group {
    margin-bottom: 1rem;
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
}

.conditions {
    display: inline;
}

.container {
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
}

@media (min-width: 576px) {
    .container-sm,
    .container {
        max-width: 540px;
    }
}

@media (min-width: 768px) {
    .container-md,
    .container-sm,
    .container {
        max-width: 720px;
    }
}

@media (min-width: 992px) {
    .container-lg,
    .container-md,
    .container-sm,
    .container {
        max-width: 960px;
    }
}

@media (min-width: 1200px) {
    .container-xl,
    .container-lg,
    .container-md,
    .container-sm,
    .container {
        max-width: 1140px;
    }
}

.justify-content-center {
    justify-content: center !important;
}

.col-form-label {
    padding-top: calc(0.6rem + 1px);
    padding-bottom: calc(0.6rem + 1px);
    margin-bottom: 0;
    font-size: inherit;
    line-height: 1.6;
}

@media (min-width: 768px) {
    .text-md-left {
        text-align: left !important;
    }

    .text-md-right {
        text-align: right !important;
    }

    .text-md-center {
        text-align: center !important;
    }
}



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
</style>