export default () => {
    const ic = window?.Intercom;

    ic('reattach_activator');
    ic('update', ic.intercomSettings);
}