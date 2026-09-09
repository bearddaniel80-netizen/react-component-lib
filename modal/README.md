# modal

## Description
A generic modal, popup window.

---
## Code Use
```text
const [isModalOpen, setIsModalOpen] = useState(false);
```
---
## UI Use
```text
        <div>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            title="Column settings"
          >
          <!-- lucide-react icon-->
            <Settings/>
            <span>Columns</span>
          </button>
        </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Column Settings"
      >
        <!-- Custom component -->
        <ColumnSettings
          columns={columns}
        />
      </Modal>
```