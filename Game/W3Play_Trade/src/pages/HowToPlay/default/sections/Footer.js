import React from "react";
import APP from "../../../../app";

const Footer = () => {

    return (

        <section className="footer">

            <div className="disclaimer"><span>{APP.term('entry_disc_1')} {APP.term('entry_disc_2')} {APP.term('entry_disc_3')}</span></div>

        </section>

    );

};

export default Footer;