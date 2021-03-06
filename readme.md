1. ¿Por qué evitar los callbacks en las llamadas asíncronas?

    - Porque se formaría el llamado 'callback hell'. Nuestro código se complicaría respecto a orden y legibilidad.

2. ¿Qué es una promesa?

    - Una promesa es un objeto con una función con dos caminos: Un camino para cuando las cosas salen bien y otro cuando las cosas salen mal (resolve y reject).

    Se utiliza para retornar o no valores de manera asíncrona.

3. ¿Qué es el callback hell?

    - Es un complicado anidamiento de callbacks que es visto como una mala práctica, puesto que a la larga y mientras más largo sea el anidamiento peor legibilidad y tratamiento se tendrán con estos callbacks.

    