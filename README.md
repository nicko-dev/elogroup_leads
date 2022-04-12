# ELOGROUP Leads

Aplicativo front-end-only desenvolvido como desafio para vaga de estágio em desenvolvimento da ELOGROUP.\
O aplicativo consiste em um sistema de gerenciamento de "leads" protegido com autenticação local.

## Fluxo principal do app:

1. Ao iniciar o aplicativo, o usuário dese ser autenticado para acessar o sistema de gerenciamento de "leads". Para isso ele deve criar uma conta utilizando a opção "criar conta" no canto inferior direito do formulário de login.\
Após criar sua conta, o usuário pode realizar login através do formulário de login.

2. Uma vez autenticado, o usuário tem acesso a tabela de "leads", organizadas alfabeticamente e dispostas segundo seu "estágio" atual.\
O usuário autenticado pode realizar as seguintes ações:
    1. Criar uma nova lead através do botão "CRIAR LEAD" localizado no canto superior esquerdo da tela.
    2. Consultar informações da lead através do botão "INFO", localizado ao lado direito de cada lead.
    3. Atualizar o estágio atual da lead através da ação de "drag-and-drop". Caso o app esteja sendo utilizado em um dispositivo móvel, a mesma função pode ser acessada através do toque-duplo sobre o nome da lead.
    4. Excluir a lead atravéz do ícone "LIXEIRA" localizado ao lado direito de cada lead.
 
3. Concluído o uso do app, o usuário pode se deslogar atravavés do botão "LOGOUT" localizado no canto superior direito da tela.

## Especificações:

* O aplicativo foi desenvolvido utilizando o framework ReactJs com o template CREATE-REACT-APP, além de diversas bibliotecas. Como o app não possui back-end, os dados das leads e de usuários são armazenados no armazenamento local do navegador (local/session Storage).
* Foi implementada a persistência do login para que o usuário mantenha-se logado mesmo após um evento de "refresh" do browser. Os dados do usuário atual ficam armazenados no sessionStorage para impedir que o usuário mantenha-se logado após o fechamento do app.
* A ação de "drag-and-drop" ainda não foi totalmente implementada para dispositivos mobile, por isso foi implementada a ação de "toque duplo" em substituição.
* A chave de criptografia do Storage foi mantida nos arquivo de desenvolvimento, visto que variáveis de ambiente ficam disponíveis no bundle de "build" do app como é explicado [aqui](https://create-react-app.dev/docs/adding-custom-environment-variables/)
 
## Lista de bibliotecas usadas:
1. react-redux/reduxjs-toolkit: Utilizado para realizar o gerenciamento de estados do app.
2. material-ui: Criação os layouts e componentes.
3. react-router-dom: Gerenciamento de rotas.
4. react-hook-form: Controle de formulários.
5. yup: Autenticação de formulários através de esquemas.
6. react-dnd: Habilita a função "drag-and-drop" no ambiente desktop 
7. use-double-tap: Habilita a função "toque duplo" no ambiente mobile
8. encrypt-storage: Criptografa os dados armazenados no local/session Storage
9. dotenv: Habilida variáveis de ambiente no React
