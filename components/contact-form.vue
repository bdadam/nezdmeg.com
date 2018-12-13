<template>
    <form
        method="POST"
        name="contact-form"
        @submit="submit"
        netlify-honeypot="csapda"
        data-netlify="true"
    >
        <input type="hidden" name="form-name" value="contact-form">
        <p v-if="sendSuccess" class="success-message">Az üzenetet sikeresen elküldtük.</p>
        <p v-if="sendEerror" class="error-message">Az üzenetet nem sikerült elküldeni.</p>

        <label style="display: none;">
            Kérem, hagyja üresen ezt a mezőt!
            <input name="csapda">
        </label>
        <label class="required">
            Üzenet
            <textarea name="message" v-model="message" rows="4"></textarea>
        </label>
        <label>
            Név (nem kötelező)
            <input type="text" name="name" v-model="name">
        </label>
        <label>
            Email (nem kötelező)
            <input type="text" name="email" v-model="email">
        </label>
        <p>
            <button type="”submit”" :disabled="submitButtonDisabled">Üzenetküldés</button>
        </p>
    </form>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            email: '',
            message: '',
            sendSuccess: false,
            sendEerror: false,
        };
    },
    computed: {
        submitButtonDisabled() {
            return !this.message;
        },
    },
    methods: {
        async submit(e) {
            e.preventDefault();

            const encodeData = form => {
                const data = new URLSearchParams();
                for (const pair of new FormData(form)) {
                    data.append(pair[0], pair[1]);
                }

                return data;
            };

            try {
                const action = e.target.action;

                const result = await fetch(action, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: encodeData(e.target), //new FormData(e.target),
                });

                if (result.ok) {
                    this.success();
                } else {
                    this.error();
                }
            } catch (ex) {
                this.error();
            }
        },
        success() {
            this.sendSuccess = true;
            this.sendEerror = false;

            this.name = '';
            this.message = '';
            this.email = '';
        },
        error() {
            this.sendSuccess = false;
            this.sendEerror = true;
        },
    },
};
</script>
<style lang="scss" scoped>
form {
    width: 100%;
}

.form-field {
    width: 100%;
}

label {
    display: block;
    width: 100%;
    margin-bottom: 12px;
}

.required {
    font-weight: bold;
}

input,
textarea {
    display: block;
    width: 100%;
    padding: 10px 6px;
    border-radius: 3px;
    border: 1px solid #ddd;
    font-size: 1em;
    margin-top: 3px;
}

button {
    border: 0;
    background-color: #a00;
    padding: 12px 24px;
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 1.25rem;
    border-radius: 4px;
}

button[disabled] {
    background-color: #a88;
}

.success-message {
    background-color: #3e6b27;
    color: #fff;
    padding: 12px;
    margin-bottom: 20px;
    font-weight: bold;
}

.error-message {
    background-color: #8e0d41;
    color: #fff;
    padding: 12px;
    margin-bottom: 20px;
    font-weight: bold;
}
</style>

