import styles from "./CampoForm.module.css";

function CampoForm({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
  ancho = "100%",
  checked,
  rows = 3,
}) {
  if (type === "checkbox") {
    return (
      <div className={styles.campoForm__checkboxContainer} style={{ width: ancho }}>
        <label className={styles.campoForm__checkboxLabel}>
          <input
            type="checkbox"
            name={name}
            checked={checked}
            onChange={onChange}
          />
          {label}
        </label>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <label className={styles.campoForm__label} style={{ width: ancho }}>
        {label}
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={styles.input}
        />
        {error && <div className={styles.campoForm__error}>{error}</div>}
      </label>
    );
  }

  return (
    <label className={styles.campoForm__label} style={{ width: ancho }}>
      {label}
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
      {error && <div className={styles.campoForm__error}>{error}</div>}
    </label>
  );
}
export default CampoForm