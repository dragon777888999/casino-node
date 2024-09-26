export default (skin_idx) => {
    switch (skin_idx) {
        case 2:
            return { trail: '#445278', inner: ([['#00ff93', .33], ['#00ff93', .33], ['#00ff93', .33]]) };

        case 3:
            return { trail: '#fff', inner: ([['#2d48f7', .33], ['#2d48f7', .33], ['#ff183e', .33]]) };

        case 4:
            return { trail: '#6a6a6a', inner: ([['#aef83b', .33], ['#aef83b', .33], ['#ff3d17', .33]]) };

        case 5:
                return { trail: '#6a6a6a', inner: ([['#aef83b', .33], ['#aef83b', .33], ['#ff3d17', .33]]) };

        case 6:
            return { trail: '#181818', inner: ([['#AEF83B', .33], ['#AEF83B', .33], ['#ff003d', .33]]) };
                
        default:
            return { trail: '#445478', inner: ([['#b2f939', .33], ['#f4d56f', .33], ['#e02e2b', .33]]) };
    }
}