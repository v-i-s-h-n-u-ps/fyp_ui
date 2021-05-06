import Document, { Html, Head, Main, NextScript } from 'next/document';
import nextCookie from 'next-cookies';

class MyDocument extends Document {

    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        const {store} = ctx;
        const { locale, theme } = nextCookie(ctx);
        const accessibilityProps = {
            locale: 'en',
            direction: 'ltr',
            theme: 'light'
        };
        if(locale){
            accessibilityProps.locale = locale
        }
        if(theme){
            accessibilityProps.theme = theme
        }
        return { ...initialProps, ...accessibilityProps };
    }
  
    render() {
        const { locale, direction, theme } = this.props;
        return (
            <Html lang={locale} dir={direction}>
                <Head />
                <body className={theme}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument