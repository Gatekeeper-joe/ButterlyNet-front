<template>
    <div class="col-md-7">
        <div class="card mt-5">
            <div class="card-header card-text">URL登録</div>

            <div class="card-body">
                <form method="POST" @submit.prevent="regist">
                    <div class="form-group row">
                        <label for="url" class="col-md-3 col-form-label text-md-right card-text">URL</label>

                        <div class="col-md-8">
                            <input id="url" type="text" class="form-control" :class="duplication ? 'is-invalid': null" name="url" placeholder="更新確認したいページのURLを入力してください" ref="inputURL" required autofocus v-model="data.url">
                            <span class="invalidFeedback" v-if="duplication">
                                <strong >{{ message }}</strong>
                            </span>
                        </div>
                    </div>

                    <div class="form-group row mb-0 form-lower-part">
                        <div class="col-md-12 text-center">
                            <button type="submit" class="btn btn-primary">
                                登録
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div v-html="error"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            error: '',
            duplication: false,
            message: '',
            data: {
                url: '',
                uid: this.$auth.user.id,
            }
        }
    },

    methods: {
        async regist() {
            this.$axios.$post('/registURL', { data: this.data})
            .then((res)=>{
                if (res === 0) {
                    this.duplication = true,
                    this.message = '指定したURLは既に登録されています'
                } else {
                    this.message = '';
                    this.duplication = false;
                    this.data.url = '';
                    alert('URLの登録が完了しました。');
                    this.$nextTick(() => this.$refs.inputURL.focus())
                }
            })
            .catch((err) => {
                alert(err);
                this.error = "指定されたURLにアクセスできません。" + "<br>" + "再度登録ボタンを押すか利用可能なURLを指定してください。"
            })
        }
    },

    mounted() {
        //autofocusを有効にする
        this.$nextTick(() => this.$refs.inputURL.focus())
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

    .invalidFeedback {
        width: 100%;
        margin-top: 0.25rem;
        font-size: 1.3rem;
        color: #e3342f;
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

    .ru-form-group {
        padding-top: 3rem;
        text-align: center;
    }

</style>
