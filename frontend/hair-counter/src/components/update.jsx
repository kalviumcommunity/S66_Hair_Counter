import React, { useState, useEffect } from "react";

const EntityManager = () => {
    const [entities, setEntities] = useState([]);
    const [formData, setFormData] = useState({ name: "" });
    const [isEditing, setIsEditing] = useState(false);

    // Fetch entities from server
    const fetchEntities = async () => {
        const response = await fetch("/getEntities");
        const data = await response.json();
        setEntities(data);
    };

    useEffect(() => {
        fetchEntities();
    }, []);

    // Add or Update Entity
    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = isEditing ? "PUT" : "POST";
        const url = isEditing ? `/updateEntity/${formData.id}` : "/addEntity";

        const response = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (isEditing) {
            setEntities((prev) =>
                prev.map((entity) =>
                    entity.id === result.id ? result : entity
                )
            );
        } else {
            setEntities((prev) => [...prev, result]);
        }
        setFormData({ name: "" });
        setIsEditing(false);
    };

    // Delete Entity
    const handleDelete = async (id) => {
        await fetch(`/deleteEntity/${id}`, { method: "DELETE" });
        setEntities((prev) => prev.filter((entity) => entity.id !== id));
    };

    // Select an entity for editing
    const handleEdit = (entity) => {
        setFormData(entity);
        setIsEditing(true);
    };

    return (
        <div>
            <h1>Entity Manager</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Entity Name"
                />
                <button type="submit">{isEditing ? "Update" : "Add"}</button>
            </form>

            <ul>
                {entities.map((entity) => (
                    <li key={entity.id}>
                        {entity.name}
                        <button onClick={() => handleEdit(entity)}>Edit</button>
                        <button onClick={() => handleDelete(entity.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EntityManager;
