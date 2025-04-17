"use client";

import axios from "axios";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import CharacterCard from "../../components/CharacterCard";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
    const [search, setSearch] = useState("");
    const [characters, setCharacters] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const fetchCharacters = async (name = "") => {
        setNotFound(false);
        try {
            const { data } = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
            setCharacters(data.results);
        } catch {
            setNotFound(true);
            setCharacters([]);
        }
    };
    useEffect(() => {
        fetchCharacters();
    }, []);

    const handleCardClick = (name) => {
        toast.info(`Você clicou em ${name}`, {
        });
    }
    return (
        <div className={styles.container}>
            <ToastContainer position="top-right"
                autoClose={7500}
                theme="light"
            />
            <h1 className={styles.title}>Personagens de Rick and Morty</h1>
            <div className={styles.controls}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Digite o nome do personagem"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}/>
                <button onClick={() => {
                    fetchCharacters(search);
                    setSearch("");
                }} className={styles.buttonSearch}
                >
                    Pesquisar
                </button>

                <button
                    onClick={() => {
                        fetchCharacters();
                        setSearch("");
                    }} className={styles.buttonReset}
                >
                    Resetar
                </button>
            </div>
            {notFound && (
                <h1 className={styles.notFound}>Nenhum personagem encontrado</h1>)}

            <div className={styles.grid}>
                {characters.map((char) => (
                    <CharacterCard key={char.id} character={char} onClick={() => handleCardClick(char.name)} />
                ))}
            </div>
        </div>
    );
};