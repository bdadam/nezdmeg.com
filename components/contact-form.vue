<template>
    <div>
        <form
            method="POST"
            name="contact3"
            @submit="submit"
            netlify-honeypot="csapda"
            data-netlify="true"
        >
            <input type="hidden" name="form-name" value="contact3">
            <p v-if="sendSuccess">Az üzenetet sikeresen elküldtük.</p>
            <p v-if="sendEerror">Az üzenetet nem sikerült elküldeni.</p>

            <p hidden>
                <label>
                    Kérem, hagyja üresen ezt a mezőt!
                    <input name="csapda">
                </label>
            </p>
            <p class="form-field">
                <label>
                    Név (opcionális)
                    <input type="text" name="name" v-model="name">
                </label>
            </p>
            <p>
                <label>
                    Email (opcionális)
                    <input type="text" name="email" v-model="email">
                </label>
            </p>
            <p>
                <label>
                    Üzenet
                    <textarea name="message" v-model="message" rows="4"></textarea>
                </label>
            </p>
            <p>
                <button type="”submit”">Send</button>
            </p>
        </form>
    </div>
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
                // const action = this.$refs.ssrform.action;

                const result = await fetch(action, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    // headers: { 'Content-Type': 'multipart/form-data' },
                    body: encodeData(e.target), //new FormData(e.target),
                    // body: this.encode({
                    //   'form-name': 'ask-team-vue',
                    //   ...this.form
                    // })
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
}
</style>

