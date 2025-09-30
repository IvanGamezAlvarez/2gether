const messagesEl = document.getElementById('messages');
const msgInput = document.getElementById('msgInput');
const sendBtn = document.getElementById('sendBtn');
const chatNameEl = document.getElementById('chatName');
const chatAvatarEl = document.getElementById('chatAvatar');
const chatStatusEl = document.getElementById('chatStatus');

const chats = {
  'Ana Pérez': [
    { sender: 'them', text: '¡Hola! ¿Cómo estás?' },
    { sender: 'me', text: 'Muy bien, gracias. ¿Y tú?' },
  ],
  'Carlos López': [
    { sender: 'them', text: 'Listo para la reunión.' },
    { sender: 'me', text: 'Perfecto, nos vemos allí.' },
  ],
  'María Gómez': [
    { sender: 'them', text: 'Gracias por tu ayuda.' },
    { sender: 'me', text: 'De nada, un placer.' },
  ]
};

let currentChat = 'Ana Pérez';

function renderMessages(){
    messagesEl.innerHTML = '';
    chats[currentChat].forEach(msg => {
        const div = document.createElement('div');
        div.className = `bubble ${msg.sender}`;
        div.textContent = msg.text;
        messagesEl.appendChild(div);
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function openChat(name, avatarLetter){
    currentChat = name;
    chatNameEl.textContent = name;
    chatAvatarEl.textContent = avatarLetter;
    chatStatusEl.textContent = 'En línea';

    document.querySelectorAll('.chat-item').forEach(item => item.classList.remove('active'));
    event.currentTarget.classList.add('active');

    renderMessages();
}

sendBtn.addEventListener('click', ()=>{
    if(msgInput.value.trim() === '') return;
    chats[currentChat].push({ sender: 'me', text: msgInput.value });
    msgInput.value = '';
    renderMessages();
});

msgInput.addEventListener('keypress', (e)=>{
    if(e.key === 'Enter') sendBtn.click();
});

renderMessages();
