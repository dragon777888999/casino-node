import React from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../store';
import { Provider } from 'react-redux';

const MyApp = ({ Component, ...rest }: AppProps) => {
    console.log("12341234!@#$!@#$!@#$!");
    const { store, props } = wrapper.useWrappedStore(rest);
    return (
        // Wrapping the entire application with the Redux provider
            <Component {...props.pageProps} />
    );
};

export default wrapper.withRedux(MyApp);