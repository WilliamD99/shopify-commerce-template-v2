const menuFragment = /* GraphQl */ `
    fragment menu on Menu {
        items {
            title
            url
            items {
                title 
                url
                items {
                    title
                    url
                }
            }
        }
    }
`;

export default menuFragment;
