export function setEmailLocalStorage(email: string): void {
    // Verifica se o email é uma string não vazia
    if (typeof email === 'string' && email.trim() !== '') {
      // Salva o email no Local Storage com a chave 'userEmail'
      localStorage.setItem('userEmail', email);
    }
  }
  
  export function getEmailLocalStorage(): string | null {
    const email = localStorage.getItem('userEmail');
    if (email) {
      return email;
    } else {
      return null;
    }
  }
  
  export function removeEmailLocalStorage(): void {
    localStorage.removeItem('userEmail');
  }
  