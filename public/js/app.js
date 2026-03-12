document.addEventListener('DOMContentLoaded', () => {
    loadPets();
    setupFormHandlers();
});

async function loadPets() {
    const grid = document.getElementById('pet-grid');
    try {
        const response = await fetch('/api/pets');
        const pets = await response.json();
        
        grid.innerHTML = '';
        
        pets.forEach(pet => {
            const card = document.createElement('div');
            card.className = 'card pet-card';
            card.innerHTML = `
                <img src="${pet.imagemUrl}" alt="${pet.nome}" loading="lazy">
                <div class="pet-meta">
                    <span>${pet.tipo}</span>
                    <span>•</span>
                    <span>${pet.porte}</span>
                </div>
                <h3>${pet.nome}</h3>
                <p class="text-muted">${pet.descricao}</p>
                <button class="btn-primary w-full" style="margin-top: 20px" onclick="alert('Obrigado pelo interesse! Entraremos em contato para o processo de adoção de ${pet.nome}.')">Quero Adotar</button>
            `;
            grid.appendChild(card);
        });
    } catch (error) {
        grid.innerHTML = '<p>Erro ao carregar os pets. Tente novamente mais tarde.</p>';
        console.error('Error loading pets:', error);
    }
}

function setupFormHandlers() {
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(volunteerForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch('/api/voluntarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    alert('Inscrição enviada com sucesso! Entraremos em contato em breve.');
                    volunteerForm.reset();
                } else {
                    throw new Error('Falha ao enviar');
                }
            } catch (error) {
                alert('Erro ao enviar inscrição. Tente novamente.');
            }
        });
    }
}
