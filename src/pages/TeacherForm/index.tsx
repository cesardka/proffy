import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import Input       from '../../components/Input';
import PageHeader  from '../../components/PageHeader';
import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea    from '../../components/Textarea';
import Select      from '../../components/Select';
import api         from '../../services/api';
import './styles.css';

function TeacherForm() {
    const history = useHistory();

    const [ name, setName ] = useState('');
    const [ avatar, setAvatar ] = useState('');
    const [ whatsapp, setWhatsapp ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ subject, setSubject ] = useState('');
    const [ cost, setCost ] = useState('');

    const defaultScheduleItem = { week_day: 0, from: '', to: '' }
    const [ scheduleItems, setScheduleItems ] = useState([
        defaultScheduleItem
    ]);

    function addScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            defaultScheduleItem,
        ]);
    }
    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }
            return scheduleItem;
        });

        setScheduleItems(updatedScheduleItems);
    }

    async function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        const requestBody = {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems,
        };

        try {
            await api.post('classes', requestBody);
            alert('Cadastro realizado com sucesso!');
            history.push('/');
        } catch(e) {
            alert('Erro ao cadastrar!');
            console.error(e);
        }
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo, é preencher esse
                formulário de inscrição."
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input
                            name="name"
                            label="Nome completo"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => { setName(e.target.value)}}
                        />
                        <Input
                            name="avatar"
                            label="Avatar"
                            type="text"
                            id="avatar"
                            value={avatar}
                            onChange={(e) => { setAvatar(e.target.value)}}
                        />
                        <Input
                            name="whatsapp"
                            label="Whatsapp"
                            type="text"
                            id="whatsapp"
                            value={whatsapp}
                            onChange={(e) => { setWhatsapp(e.target.value)}}
                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(e) => { setBio(e.target.value)}}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            name="subject"
                            label="Matéria"
                            options={[
                                { value: 'Artes', label: 'Artes'},
                                { value: 'Química', label: 'Química'},
                                { value: 'Biologia', label: 'Biologia'},
                                { value: 'Português', label: 'Português'},
                            ]}
                            value={subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                        />
                        <Input
                            name="cost"
                            label="Custo da sua aula por hora"
                            value={cost}
                            onChange={(e) => { setCost(e.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addScheduleItem}>+ Novo horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                            <div key={scheduleItem.week_day + "_" + index} className="schedule-item">
                                <Select
                                    id="week_day"
                                    label="Dia da semana"
                                    name="week_day"
                                    value={scheduleItem.week_day}
                                    options={[
                                        { value: '1', label: 'Segunda-feira'},
                                        { value: '2', label: 'Terça-feira'},
                                        { value: '3', label: 'Quarta-feira'},
                                        { value: '4', label: 'Quinta-feira'},
                                        { value: '5', label: 'Sexta-feira'},
                                        { value: '6', label: 'Sábado'},
                                        { value: '0', label: 'Domingo'},
                                    ]}
                                    onChange={(e) => { setScheduleItemValue(index, "week_day", e.target.value) }}
                                />
                                <Input
                                    name="from"
                                    value={scheduleItem.from}
                                    label="Das"
                                    type="time"
                                    onChange={(e) => { setScheduleItemValue(index, "from", e.target.value) }} />
                                <Input
                                    name="to"
                                    value={scheduleItem.to}
                                    label="Até"
                                    type="time"
                                    onChange={(e) => { setScheduleItemValue(index, "to", e.target.value) }} />
                            </div>
                            )
                        })}
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;