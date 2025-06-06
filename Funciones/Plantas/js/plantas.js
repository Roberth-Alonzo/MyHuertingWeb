document.addEventListener('DOMContentLoaded', () => {
    const plantas = [
        {
            nombre: "Zanahoria",
            tipo: "Hortaliza",
            descripcion: "Raíz comestible rica en vitaminas.",
            consejos: "Siembra en suelos sueltos y bien drenados. Necesita riego constante sin encharcar."
        },
        {
            nombre: "Pepino",
            tipo: "Hortaliza",
            descripcion: "Fruto fresco ideal para ensaladas.",
            consejos: "Requiere mucho sol y riego frecuente. Utiliza tutores para que crezca vertical."
        },
        {
            nombre: "Pimiento",
            tipo: "Hortaliza",
            descripcion: "Fruto usado en diversas recetas.",
            consejos: "Prefiere temperaturas cálidas. No tolera el exceso de agua."
        },
        {
            nombre: "Fresa",
            tipo: "Fruta",
            descripcion: "Fruta dulce ideal para postres.",
            consejos: "Plántala en macetas o jardineras. Necesita sol directo y riego moderado."
        },
        {
            nombre: "Romero",
            tipo: "Hierba",
            descripcion: "Aromática usada en cocina y medicina.",
            consejos: "Crece bien en suelos secos. No necesita mucho riego y ama el sol."
        },
        {
            nombre: "Lechuga",
            tipo: "Hortaliza",
            descripcion: "Hortaliza de hojas verdes muy usada en ensaladas.",
            consejos: "Necesita semisombra y riegos frecuentes. Protege del calor extremo."
        },
        {
            nombre: "Albahaca",
            tipo: "Hierba",
            descripcion: "Planta aromática ideal para cocinar.",
            consejos: "Requiere sol directo y riego diario en climas cálidos. Pellizca las flores para que no suba a semilla."
        },
        {
            nombre: "Tomate",
            tipo: "Fruta",
            descripcion: "Fruto muy usado en cocina.",
            consejos: "Necesita sol directo, riego constante sin mojar las hojas y tutores para sostener la planta."
        },
        {
            nombre: "Cilantro",
            tipo: "Hierba",
            descripcion: "Aromática de uso común en la cocina.",
            consejos: "Siembra en primavera, en semisombra. Riega con frecuencia para mantener la humedad."
        },
        {
            nombre: "Espinaca",
            tipo: "Hortaliza",
            descripcion: "Hortaliza de hoja verde rica en hierro.",
            consejos: "Prefiere climas frescos. Riega de forma regular y cosecha hojas externas primero."
        }
    ];

    const contenedor = document.getElementById('contenedorPlantas');

    plantas.forEach(planta => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-planta';
        tarjeta.innerHTML = `
            <h3>${planta.nombre}</h3>
            <p><strong>Tipo:</strong> ${planta.tipo}</p>
            <p><strong>Descripción:</strong> ${planta.descripcion}</p>
            <p><strong>Consejos:</strong> ${planta.consejos}</p>
        `;
        contenedor.appendChild(tarjeta);
    });
});
