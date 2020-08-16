import React, { useState, FormEvent} from 'react';
import Input                    from '../../components/Input';
import PageHeader               from '../../components/PageHeader';
import Select                   from '../../components/Select';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import './styles.css';
import api from '../../services/api';

function TeacherList() {
    const [ teachers, setTeachers ] = useState([]);
    const [ subject,  setSubject ] = useState("");
    const [ week_day, setWeekDay ] = useState("");
    const [ time,     setTime ] = useState("");

    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const params = { subject, week_day, time };
        const { data } = await api.get('classes', { params });
        setTeachers(data);
    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Esses são os proffys disponíveis.">
                <form id="search-teachers">
                    <Select
                        id="subject"
                        label="Matéria"
                        name="subject"
                        options={[
                            { value: 'Artes', label: 'Artes'},
                            { value: 'Química', label: 'Química'},
                            { value: 'Biologia', label: 'Biologia'},
                            { value: 'Português', label: 'Português'},
                        ]}
                        value={subject}
                        onChange={e => { setSubject(e.target.value) }}
                    />
                    <Select
                        id="week_day"
                        label="Dia da semana"
                        name="week_day"
                        options={[
                            { value: '1', label: 'Segunda-feira'},
                            { value: '2', label: 'Terça-feira'},
                            { value: '3', label: 'Quarta-feira'},
                            { value: '4', label: 'Quinta-feira'},
                            { value: '5', label: 'Sexta-feira'},
                            { value: '6', label: 'Sábado'},
                            { value: '0', label: 'Domingo'},
                        ]}
                        value={week_day}
                        onChange={e => { setWeekDay(e.target.value) }}
                    />
                    <Input label="Horário" name="time"  type="time" id="time"
                    value={time}
                    onChange={e => { setTime(e.target.value) }} />

                    <button type="submit" onClick={searchTeachers}>
                        Buscar
                    </button>
                </form>
            </PageHeader>

            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}
            </main>
        </div>
    );
}

export default TeacherList;