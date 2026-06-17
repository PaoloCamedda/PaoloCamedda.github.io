document.addEventListener("DOMContentLoaded", () => {
    // 1. CARICAMENTO DATI DINAMICI DA JSON
    // Se metti data.json nella root del progetto, il path sarà './data.json'
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            popolaStudi(data.studi);
            popolaProgetti(data.progetti);
            popolaCompetenze(data.competenze);
        })
        .catch(error => console.error("Errore nel caricamento dei dati:", error));

    // Funzione per generare il blocco Studi
    function popolaStudi(studi) {
        const container = document.getElementById("studi-list");
        container.innerHTML = studi.map(studio => `
            <div class="card">
                <h3>${studio.istituto}</h3>
                <p>${studio.titolo}</p>
            </div>
        `).join('');
    }

    // Funzione per generare la griglia dei Progetti
    function popolaProgetti(progetti) {
        const container = document.getElementById("projects-grid");
        container.innerHTML = progetti.map(progetto => `
            <div class="project-card">
                <div class="project-image">
                    <img src="${progetto.immagine}" alt="Anteprima ${progetto.titolo}">
                </div>
                <div class="project-info">
                    <h3>${progetto.titolo}</h3>
                    <p>${progetto.descrizione}</p>
                    <div class="project-tags">
                        ${progetto.tags.map(tag => `<span>${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${progetto.link}" target="_blank" class="btn-github">
                            <i class="devicon-github-original"></i> Repository
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Funzione per generare le icone delle Competenze
    function popolaCompetenze(competenze) {
        const container = document.getElementById("skills-grid");
        container.innerHTML = competenze.map(skill => `
            <div class="skill-item">
                <i class="${skill.iconClass}"></i>
                <span>${skill.nome}</span>
            </div>
        `).join('');
    }

    // 2. GESTIONE HAMBURGER MENU PER DISPOSITIVI MOBILI
    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    hamburger.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        
        // Cambia l'icona del pulsante
        if (sidebar.classList.contains("active")) {
            hamburger.innerHTML = "✕";
        } else {
            hamburger.innerHTML = "☰";
        }
    });

    // Chiude la sidebar quando si clicca su un link del menu (comodo su mobile)
    const navLinks = document.querySelectorAll(".nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if(sidebar.classList.contains("active")) {
                sidebar.classList.remove("active");
                hamburger.innerHTML = "☰";
            }
        });
    });
});