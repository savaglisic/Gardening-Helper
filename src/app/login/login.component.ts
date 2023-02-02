import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  template: `
  <div class="container has-text-centered">
        <p class="title">
         Welcome Back!
       </p>
       </div>
    <html lang="en">

<head>
  
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome Back!</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
</head>

<body>
    <div class="hero is-medium">
        <div class="hero-body is-justify-content-center is-align-items-center">
            <div class="columns is-flex is-flex-direction-column box">
                <div class="column">
                    <label for="email">Email</label>
                    <input class="input is-primary" type="text" placeholder="Email address">
                </div>
                <div class="column">
                    <label for="Name">Password</label>
                    <input class="input is-primary" type="password" placeholder="Password">
                    <a href="forget.html" class="is-size-7 has-text-primary">Forget password?</a>
                </div>
                <div class="column">
                    <button class="button is-primary is-fullwidth" type="submit">Login</button>
                </div>
                <div class="has-text-centered">
                    <p class="is-size-7"> Don't have an account? <a href="#" class="has-text-primary">Sign up</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
  `,
  styles: [
  ]
})
export class LoginComponent {

}
