import Hyperbeam from 'http://localhost:8080/api/dist/index.js'
import { PerfectCursor } from 'perfect-cursors'

async function main() {
  const resp = await fetch('http://localhost:8081/computer');
  const data = await resp.json();

  const container = document.getElementById('hb-computer-container');
  const rect = container.getBoundingClientRect();
  const cursors = new Map();

  function newCursor(userId) {
    const elm = document.createElement('div');
    elm.classList.add('cursor');
    document.body.appendChild(elm);
    const updateCursor = p => elm.style.setProperty('transform', `translate(${p[0]}px, ${p[1]}px)`);
    const pc = new PerfectCursor(updateCursor);
    const onTimeout = () => {
      elm.remove();
      pc.dispose();
      cursors.delete(userId);
    };
    let timeout = setTimeout(onTimeout, 5000);
    const update = (positions) => {
      pc.addPoint(positions);
      clearTimeout(timeout);
      timeout = setTimeout(onTimeout, 5000);
    }
    const updateInstant = (p) => {
      updateCursor(p)
      clearTimeout(timeout);
      timeout = setTimeout(onTimeout, 5000);
    }
    cursors.set(userId, {
      update,
      updateInstant,
    });
  }

  const hb = await Hyperbeam(container, data.embed_url, {
    onCursor({ x, y, userId }) {
      if (!cursors.has(userId)) {
        newCursor(userId);
      }
      const cursor = cursors.get(userId);
      const position = [
        container.offsetWidth * x + rect.left,
        container.offsetHeight * y + rect.top,
      ];
      // cursor.update(position)
      cursor.updateInstant(position)
    }
  });
}

main();
