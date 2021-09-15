import {Dropdown} from "react-bootstrap";
import React from "react";

const LanguageSelector = ({ setLanguage, language }) => {
    const language_label = {
        'ro': 'Limbă',
        'en': 'Language'
    };

    return (
        <Dropdown className="align-items-end align-content-center d-flex">
            <Dropdown.Toggle variant={'secondary'} id={'dropdown-basic'} size={'sm'}>
                {language_label[language]}
            </Dropdown.Toggle>

            <Dropdown.Menu align={'right'}>
                <Dropdown.Item as={'button'} {...language === 'en' ? {'disabled': true} : {'active': true}}
                    onClick={() => {
                        setLanguage('en');
                        localStorage.setItem('language', 'en');
                }}>
                    English
                </Dropdown.Item>
                <Dropdown.Item as={'button'} {...language === 'ro' ? {'disabled': true} : {'active': true}}
                    onClick={() => {
                        setLanguage('ro');
                        localStorage.setItem('language', 'ro');
                }}>
                    Română
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default LanguageSelector;