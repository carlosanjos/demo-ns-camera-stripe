# Setting up the demo

You need to provide Stripe keys to the global file located at `src/app/stripe/stripe.global.ts`

remember kids, keep your API keys secured!

# My environment

*  `tns --version` 6.3.0
* Android 9
* Galaxy S8+
* macOS 10.14.5

# Steps to reproduce the bug

1. Tap on the button to take a photo a capture any photo; Notice the Image widget will be populated with the photo just taken

2. Fill in with a valid  stripe testing card information, you can find them here [https://stripe.com/docs/testing](https://stripe.com/docs/testing)

3. Tap on save payment card button

4. A pop-up will displayed informing the operation succeed

5. Refer to step one and take another photo; Notice the photo won't be captured this time