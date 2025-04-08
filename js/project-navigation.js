// Proje sayfaları arasında gezinme
const projects = [
    'project-iitee.html',
    'pixel-serpent.html',
    'ezan-vakti.html'
];

function getCurrentProjectIndex() {
    const currentPath = window.location.pathname;
    const currentFile = currentPath.split('/').pop();
    return projects.indexOf(currentFile);
}

function setupProjectNavigation() {
    const currentIndex = getCurrentProjectIndex();
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    const nextIndex = (currentIndex + 1) % projects.length;

    const navigation = document.createElement('div');
    navigation.className = 'project-navigation';
    navigation.innerHTML = `
        <a href="${projects[prevIndex]}" class="nav-arrow prev">
            <i class="fas fa-chevron-left"></i>
        </a>
        <a href="${projects[nextIndex]}" class="nav-arrow next">
            <i class="fas fa-chevron-right"></i>
        </a>
    `;

    document.querySelector('.project-detail').appendChild(navigation);
}

// Sayfa yüklendiğinde navigasyonu kur
document.addEventListener('DOMContentLoaded', setupProjectNavigation);
