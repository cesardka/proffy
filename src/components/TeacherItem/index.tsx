import React from 'react';
import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import api from '../../services/api';

export interface Teacher {
    id: number;
    name: string;
    avatar: string;
    subject: string;
    bio: string;
    cost: number;
    whatsapp: string;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const openWhatsapp = (name: string, whatsappNumber: string) => {
    const whatsappText = encodeURIComponent(`Olá, ${name}! Encontrei seu perfil no Proffy e gostaria de orçar uma aula com você`);
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
    window.open(whatsappURL, '_blank');
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    function addNewConnection() {
        api.post('/connections', { 'user_id': teacher.id });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={`Foto Proffy ${teacher.name}`} />
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>

            <p>{teacher.bio}</p>

            <footer>
                <p>
                    Preço / hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <button type="button" onClick={() => { openWhatsapp(teacher.name, teacher.whatsapp); addNewConnection(); } }>
                    <img src={whatsappIcon} alt="Whatsapp" />
                    Entrar em contato
                </button>
            </footer>
        </article>
    );
}

export default TeacherItem;