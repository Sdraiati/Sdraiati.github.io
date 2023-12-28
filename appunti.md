- L'argomento che verrà assegnato ad angle in createSlice sarà determinato in base alla percentuale sul totale.

- formula per trovare il secondo punto del segmento all'interno della circonferenza
$$
\begin{align}
x_2=x_1+radius \cdot cos(angle)\\
y_2=y_1+radius \cdot sin(angle)
\end{align}
$$

- formula conversione gradi in radianti
$$rad\_angle = \frac{angle॰ \cdot \pi}{180}$$
- si esegue una sottrazione di 180 perché *nei canvas l'asse y invertito* (verso il basso) *rispetto al piano cartesiano*.

```JS
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Create path
let region = new Path2D();
region.moveTo(30, 90);
region.lineTo(110, 20);
region.lineTo(240, 130);
region.lineTo(60, 130);
region.lineTo(190, 20);
region.lineTo(270, 90);
region.closePath();

// Fill path
ctx.fillStyle = "green";
ctx.fill(region, "evenodd");
```