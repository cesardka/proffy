import React from 'react';
import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars0.githubusercontent.com/u/19770271?s=460&u=81ceb9032ca72522a5530b5f0c9c538cd24dac57&v=4" alt="Foto Proffy César Hoffmann" />
                <div>
                    <strong>César Hoffmann</strong>
                    <span>Artes</span>
                </div>
            </header>

            <p>Pinta como eu pinto?</p>

            <footer>
                <p>
                    Preço / hora
                    <strong>R$ 42,00</strong>
                </p>
                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;