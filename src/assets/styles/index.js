import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    html {
        font-family: Arial, Helvetica, sans-serif;
    }

    body {
        line-height: 1.5;
        color: ${({ theme }) => theme.filling};
        transition: color 0.3s;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;
