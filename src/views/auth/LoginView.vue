<template>
  <form @submit.prevent class="flex flex-col items-start gap-4">
    <div>
      <Label id="email">Email</Label>
      <Input v-model="email" type="email" placeholder="Email" />
    </div>

    <div>
      <Label id="password">Password</Label>
      <Input v-model="password" type="password" placeholder="Password" />
    </div>

    <Button type="submit" @click="login">Login</Button>
  </form>
</template>

<script>
import Input from "@/components/shared/Input.vue";
import Button from "@/components/shared/Button/Button.vue";
import Label from "@/components/shared/Label.vue";

export default {
  components: {
    Input,
    Button,
    Label,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      // Send login request to API
      const response = await fetch("https://example.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      });

      // Handle response from API
      const data = await response.json();
      console.log(data);
    },
  },
};
</script>
