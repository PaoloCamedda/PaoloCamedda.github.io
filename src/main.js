document.addEventListener("DOMContentLoaded", () => {
    // 1. CARICAMENTO DATI DINAMICI DA JSON
    fetch('./data.json')
        .then(response => response.json())
        .then(data => {
            popolaStudi(data.studi);
            
            // Caricamento della nuova sezione Esperienze Lavorative
            if (data.esperienze) {
                popolaEsperienze(data.esperienze);
            }
            
            popolaProgetti(data.progetti);
            
            if (data.certificazioni) {
                popolaCertificazioni(data.certificazioni);
            }
            
            popolaCompetenze(data.competenze);
        })
        .catch(error => console.error("Errore nel caricamento dei dati:", error));

    // Funzione per generare il blocco Studi con i Loghi
    function popolaStudi(studi) {
        const container = document.getElementById("studi-list");
        if (!container) return;
        container.innerHTML = studi.map(studio => `
            <div class="card-studio">
                <div class="studio-header">
                    ${studio.logo ? `
                    <div class="studio-logo">
                        <img src="${studio.logo}" alt="Logo ${studio.istituto}">
                    </div>
                    ` : ''}
                    <div class="studio-title-group">
                        ${studio.periodo ? `<span class="studio-period">${studio.periodo}</span>` : ''}
                        <h3>${studio.titolo}</h3>
                        <h4 class="studio-institute">${studio.istituto}</h4>
                    </div>
                </div>
                ${studio.dettagli ? `<p class="studio-details">${studio.dettagli}</p>` : ''}
            </div>
        `).join('');
    }

    // Funzione per generare la sezione delle Esperienze Lavorative
    function popolaEsperienze(esperienze) {
        const container = document.getElementById("experience-timeline");
        if (!container) return;

        container.innerHTML = esperienze.map(exp => `
            <div class="card exp-card">
                <div class="exp-header">
                    ${exp.logo ? `<img src="${exp.logo}" alt="Logo ${exp.azienda}" class="exp-company-logo">` : ''}
                    <div class="exp-title-block">
                        <h3>${exp.ruolo}</h3>
                        <h4 class="exp-company">${exp.azienda} — <span>${exp.periodo}</span></h4>
                    </div>
                </div>
                <ul class="exp-tasks">
                    ${exp.compiti.map(task => `<li>${task}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    // Funzione per generare la griglia dei Progetti
    function popolaProgetti(progetti) {
        const container = document.getElementById("projects-grid");
        if (!container) return;
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

    // Funzione per mostrare le Certificazioni con i loghi (basata sul campo cert.immagine)
    function popolaCertificazioni(certificazioni) {
        const container = document.getElementById("certifications-grid");
        if (!container) return;

        container.innerHTML = certificazioni.map(cert => {
            const hasLink = cert.link && cert.link.trim().toUpperCase() !== "NONE";

            const wrapperTag = hasLink ? 'a' : 'div';
            const wrapperAttrs = hasLink
                ? `href="${cert.link}" target="_blank" rel="noopener noreferrer" class="cert-card-link"`
                : `class="cert-card-link cert-card-disabled"`;

            return `
                <${wrapperTag} ${wrapperAttrs}>
                    <div class="cert-card">
                        <div class="cert-logo-frame ${!cert.immagine ? 'no-logo' : ''}">
                            ${cert.immagine ? `
                                <img src="${cert.immagine}" alt="Logo ${cert.ente}" class="cert-ente-logo">
                            ` : `
                                <i class="devicon-file-pdf"></i>
                            `}
                        </div>

                        <div class="cert-info">
                            ${cert.anno ? `<span class="cert-year">${cert.anno}</span>` : ''}
                            <h3>${cert.titolo}</h3>
                            <p class="cert-ente">${cert.ente}</p>

                            ${hasLink ? `
                                <span class="btn-visualizza">
                                    <i class="devicon-file-pdf"></i> Apri PDF
                                </span>
                            ` : ''}
                        </div>
                    </div>
                </${wrapperTag}>
            `;
        }).join('');
    }

    // Funzione per generare le icone delle Competenze
    function popolaCompetenze(competenze) {
    const container = document.getElementById("skills-grid");
    if (!container || !competenze.length) return;

    // Nuovo layout categorizzato
    if (competenze[0].categoria) {
        container.innerHTML = competenze.map(gruppo => `
            <div class="skill-category-card">
                <h3 class="skill-category-title">${gruppo.categoria}</h3>
                <div class="skill-pills-list">
                    ${gruppo.items.map(skill => `
                        <div class="skill-pill">
                            <i class="${skill.iconClass}"></i>
                            <div class="skill-pill-text">
                                <span class="skill-name">${skill.nome}</span>
                                ${skill.dettaglio ? `<span class="skill-detail">${skill.dettaglio}</span>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }
}

    // 2. GESTIONE HAMBURGER MENU PER DISPOSITIVI MOBILI
    const hamburger = document.getElementById("hamburger");
    const sidebar = document.getElementById("sidebar");

    if (hamburger && sidebar) {
        hamburger.addEventListener("click", () => {
            sidebar.classList.toggle("active");
            if (sidebar.classList.contains("active")) {
                hamburger.innerHTML = "✕";
            } else {
                hamburger.innerHTML = "☰";
            }
        });
    }

    // Chiude la sidebar quando si clicca su un link del menu
    const navLinks = document.querySelectorAll(".nav a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (sidebar && sidebar.classList.contains("active")) {
                sidebar.classList.remove("active");
                hamburger.innerHTML = "☰";
            }
        });
    });
});