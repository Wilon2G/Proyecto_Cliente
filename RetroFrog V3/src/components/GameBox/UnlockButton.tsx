type UnlockButtonProps = {
  id: string;
};

export default function UnlockButton({ id }: UnlockButtonProps) {
  const userId = sessionStorage.getItem('id'); 

  const handleClick = () => {
    console.log(`Juego con ID ${id} añadido`);

    
    if (userId) {
      fetch(`http://localhost:3000/users/${userId}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error('Error al obtener los datos del usuario');
          }
          return res.json();
        })
        .then((user) => {
          const updatedUser = {
            ...user,
            userInfo: {
              ...user.userInfo,
              gamesUnlocked: [...user.userInfo.gamesUnlocked, id], 
            },
          };


          fetch(`http://localhost:3000/users/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Error al actualizar el usuario');
              }
              console.log('Juego desbloqueado y datos de usuario actualizados');
            })
            .catch((error) => {
              console.error('Error al actualizar el usuario:', error);
            });
        })
        .catch((error) => {
          console.error('Error al obtener los datos del usuario:', error);
        });
    }
  };

  return (
    <button className="playBtn" onClick={handleClick}>
      Buy now!
    </button>
  );
}
