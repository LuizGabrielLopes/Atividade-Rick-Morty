import styles from "../styles/CharacterCard.module.css";
import Image from "next/image";

export default function CharacterCard({character, onClick }){
    return(
        <div className={styles.card} onClick={onClick}>
            <Image src={character.image}
            className={styles.avatar}
            width={150}
            height={150}
            alt={character.name} />
        <h3 className={styles.title}>{character.name}</h3>
        <p>{character.status}</p>
        <p>{character.species}</p>
        <p>{character.type}</p>
        <p>{character.gender}</p>
        </div>
    )
};