import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer.jsx';
import './Form.css';

const defaultColors = [
  'rgba(52, 152, 219, 1)',   // Azul
  'rgba(46, 204, 113, 1)',   // Verde
  'rgba(231, 76, 60, 1)',    // Rojo
  'rgba(241, 196, 15, 1)',   // Amarillo
  'rgba(44, 62, 80, 1)'      // Gris oscuro
];

const defaultFonts = {
  title: { family: 'Arial', size: 32 },
  subtitle: { family: 'Arial', size: 24 },
  normal: { family: 'Arial', size: 16 }
};

const Form = () => {
  const [colors, setColors] = useState(defaultColors);
  const [fonts, setFonts] = useState(defaultFonts);
  const [history, setHistory] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem('customization');
    if (saved) {
      const { colors: savedColors, fonts: savedFonts } = JSON.parse(saved);
      if (savedColors && Array.isArray(savedColors)) setColors(savedColors);
      if (savedFonts) setFonts(savedFonts);
    }
    const savedHistory = JSON.parse(localStorage.getItem('customization_history')) || [];
    setHistory(savedHistory);
  }, []);

  const SaveLocalStorage = (e) => {
    e.preventDefault();
    const items = { colors, fonts };
    localStorage.setItem('customization', JSON.stringify(items));
    // Guardar historial
    const updatedHistory = [...history, items];
    setHistory(updatedHistory);
    localStorage.setItem('customization_history', JSON.stringify(updatedHistory));
  };

  const handleColorChange = (idx, value) => {
    const newColors = [...colors];
    newColors[idx] = value;
    setColors(newColors);
  };

  const handleFontChange = (type, key, value) => {
    setFonts({
      ...fonts,
      [type]: {
        ...fonts[type],
        [key]: key === 'size' ? Number(value) : value
      }
    });
  };

  // Elegir una configuración del historial
  const handleSelectHistory = (idx) => {
    const item = history[idx];
    setColors(item.colors);
    setFonts(item.fonts);
    localStorage.setItem('customization', JSON.stringify(item));
  };

  // Eliminar una configuración del historial
  const handleDeleteHistory = (idx) => {
    const updatedHistory = history.filter((_, i) => i !== idx);
    setHistory(updatedHistory);
    localStorage.setItem('customization_history', JSON.stringify(updatedHistory));
  };

  // Editar una configuración del historial
  const handleEditHistory = (idx) => {
    setEditIndex(idx);
  };

  // Guardar edición
  const handleSaveEdit = (idx, newColors, newFonts) => {
    const updatedHistory = history.map((item, i) =>
      i === idx ? { colors: newColors, fonts: newFonts } : item
    );
    setHistory(updatedHistory);
    localStorage.setItem('customization_history', JSON.stringify(updatedHistory));
    setEditIndex(null);
  };

  // Número máximo de items por página en el historial
  const itemsPerPage = 4;

  // Calcular páginas
  const totalPages = Math.ceil(history.length / itemsPerPage);

  // Obtener items de la página actual
  const paginatedHistory = history.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Navbar />
      <div className="customizer-container">
        {/* Lado Izquierdo: Formulario */}
        <div className="customizer-form" style={{ marginLeft: "30px", minWidth: "220px", maxWidth: "650px", width: "100%" }}>
          <h2>Personaliza tu página</h2>
          <form onSubmit={SaveLocalStorage}>
            <h3>Colores</h3>
            {colors.map((color, idx) => (
              <div key={idx} className="form-group">
                <label>Color {idx + 1}:</label>
                <input
                  type="color"
                  value={color}
                  onChange={e => handleColorChange(idx, e.target.value)}
                  style={{ width: '180px' }}
                />
              </div>
            ))}
            <h3>Fuentes</h3>
            <div className="form-group">
              <label>Título:</label>
              <input
                type="text"
                value={fonts.title.family}
                onChange={e => handleFontChange('title', 'family', e.target.value)}
                placeholder="Fuente"
                style={{ width: '120px' }}
              />
              <input
                type="number"
                value={fonts.title.size}
                onChange={e => handleFontChange('title', 'size', e.target.value)}
                placeholder="Tamaño"
                style={{ width: '80px', marginLeft: '8px' }}
              />
            </div>
            <div className="form-group">
              <label>Subtítulo:</label>
              <input
                type="text"
                value={fonts.subtitle.family}
                onChange={e => handleFontChange('subtitle', 'family', e.target.value)}
                placeholder="Fuente"
                style={{ width: '120px' }}
              />
              <input
                type="number"
                value={fonts.subtitle.size}
                onChange={e => handleFontChange('subtitle', 'size', e.target.value)}
                placeholder="Tamaño"
                style={{ width: '80px', marginLeft: '8px' }}
              />
            </div>
            <div className="form-group">
              <label>Texto normal:</label>
              <input
                type="text"
                value={fonts.normal.family}
                onChange={e => handleFontChange('normal', 'family', e.target.value)}
                placeholder="Fuente"
                style={{ width: '120px' }}
              />
              <input
                type="number"
                value={fonts.normal.size}
                onChange={e => handleFontChange('normal', 'size', e.target.value)}
                placeholder="Tamaño"
                style={{ width: '80px', marginLeft: '8px' }}
              />
            </div>
            <button
              type="submit"
              style={{
                marginTop: "40px",
                background: "#b39ddb",
                color: "white",
                height: "6%",
                width: "20%",
                borderRadius: "6px"
              }}>
              guardar
            </button>
          </form>
        </div>
        {/* Lado Derecho: Preview y Historial */}
        <div className="customizer-preview-history" style={{ minWidth: "600px", maxWidth: "900px", width: "100%" }}>
          {/* Preview */}
          <div
            className="preview-box"
            style={{
              background: colors[1],
              color: colors[4],
              borderRadius: '12px',
              minHeight: '100px',
              width: "100%"
            }}
          >
            <header style={{
              background: colors[0],
              color: colors[3],
              padding: '1rem',
              borderRadius: '8px 8px 0 0',
              fontFamily: fonts.title.family,
              fontSize: fonts.title.size,
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              Mi Tienda CercaMio
            </header>
            <main style={{
              background: colors[2],
              color: colors[3],
              padding: '1rem',
              borderRadius: '0 0 8px 8px',
              fontFamily: fonts.normal.family,
              fontSize: fonts.normal.size,
              marginBottom: '1rem'
            }}>
              <h2 style={{
                fontFamily: fonts.subtitle.family,
                fontSize: fonts.subtitle.size,
                color: colors[4],
                margin: 0
              }}>
                ¡Bienvenido!
              </h2>
              <p>
                Esta es una vista previa de cómo se verían los colores y fuentes seleccionados en una página básica.
              </p>
              <button style={{
                background: colors[3],
                color: colors[4],
                border: 'none',
                borderRadius: '6px',
                padding: '0.5rem 1.5rem',
                fontFamily: fonts.normal.family,
                fontSize: fonts.normal.size,
                cursor: 'pointer'
              }}>
                Comprar ahora
              </button>
            </main>
          </div>
          {/* Historial */}
          <div
            className="history-box"
            style={{
              color: colors[4],
              width: "100%"
            }}
          >
            <h3>Historial de configuraciones</h3>
            {history.length === 0 && <div style={{ color: "#888" }}>No hay historial.</div>}
            <div className="history-grid">
              {paginatedHistory.map((item, idx) => {
                const realIdx = (currentPage - 1) * itemsPerPage + idx;
                return (
                  <div key={realIdx} className="history-item">
                    {editIndex === realIdx ? (
                      // Formulario de edición
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          const formData = new FormData(e.target);
                          const newColors = [
                            formData.get('color0'),
                            formData.get('color1'),
                            formData.get('color2'),
                            formData.get('color3'),
                            formData.get('color4')
                          ];
                          const newFonts = {
                            title: {
                              family: formData.get('titleFamily'),
                              size: Number(formData.get('titleSize'))
                            },
                            subtitle: {
                              family: formData.get('subtitleFamily'),
                              size: Number(formData.get('subtitleSize'))
                            },
                            normal: {
                              family: formData.get('normalFamily'),
                              size: Number(formData.get('normalSize'))
                            }
                          };
                          handleSaveEdit(realIdx, newColors, newFonts);
                        }}
                        className="history-edit-form"
                      >
                        <div className="history-edit-colors">
                          {item.colors.map((c, i) => (
                            <input
                              key={i}
                              name={`color${i}`}
                              type="color"
                              defaultValue={c}
                            />
                          ))}
                        </div>
                        <div className="history-edit-fonts">
                          <input name="titleFamily" defaultValue={item.fonts.title.family} placeholder="Título" />
                          <input name="titleSize" type="number" defaultValue={item.fonts.title.size} placeholder="Tamaño" />
                          <input name="subtitleFamily" defaultValue={item.fonts.subtitle.family} placeholder="Subtítulo" />
                          <input name="subtitleSize" type="number" defaultValue={item.fonts.subtitle.size} placeholder="Tamaño" />
                          <input name="normalFamily" defaultValue={item.fonts.normal.family} placeholder="Normal" />
                          <input name="normalSize" type="number" defaultValue={item.fonts.normal.size} placeholder="Tamaño" />
                        </div>
                        <div className="history-edit-actions">
                          <button type="submit">Guardar</button>
                          <button type="button" onClick={() => setEditIndex(null)}>Cancelar</button>
                        </div>
                      </form>
                    ) : (
                      <div className="history-view">
                        <div className="history-colors">
                          {item.colors.map((c, i) => (
                            <div key={i} style={{
                              width: 32, height: 32, borderRadius: '50%',
                              background: c, border: '2px solid #fff', display: 'inline-block', marginRight: 6
                            }} title={c}></div>
                          ))}
                        </div>
                        <div className="history-fonts">
                          <b>Título:</b> {item.fonts.title.family} ({item.fonts.title.size}px)<br />
                          <b>Subtítulo:</b> {item.fonts.subtitle.family} ({item.fonts.subtitle.size}px)<br />
                          <b>Normal:</b> {item.fonts.normal.family} ({item.fonts.normal.size}px)
                        </div>
                        <div className="history-actions">
                          <button onClick={() => handleSelectHistory(realIdx)}>Elegir</button>
                          <button onClick={() => handleEditHistory(realIdx)}>Editar</button>
                          <button onClick={() => handleDeleteHistory(realIdx)}>Eliminar</button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            {/* Paginación */}
            {totalPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: 8, margin: "16px 0" }}>
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  style={{ padding: "0.3rem 1rem", borderRadius: 4, border: "1px solid #b39ddb", background: "#f4f6fa", color: "#7e57c2", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
                >
                  Anterior
                </button>
                <span style={{ alignSelf: "center" }}>
                  Página {currentPage} de {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  style={{ padding: "0.3rem 1rem", borderRadius: 4, border: "1px solid #b39ddb", background: "#f4f6fa", color: "#7e57c2", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Form;