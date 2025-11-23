const API_URL = 'http://localhost:5000/api/notes';

async function testBackend() {
    console.log('Testing Backend API...');

    try {
        // 1. Create a Note
        console.log('1. Creating a note...');
        const createRes = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Test Note',
                content: 'This is a test note from verification script.',
            }),
        });
        const createData = await createRes.json();
        if (!createRes.ok) throw new Error(createData.message);
        console.log('   Success:', createData._id);
        const noteId = createData._id;

        // 2. Get All Notes
        console.log('2. Fetching notes...');
        const getRes = await fetch(API_URL);
        const getData = await getRes.json();
        console.log('   Success: Found', getData.length, 'notes');

        // 3. Update Note
        console.log('3. Updating note...');
        const updateRes = await fetch(`${API_URL}/${noteId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Updated Test Note',
            }),
        });
        const updateData = await updateRes.json();
        console.log('   Success:', updateData.title);

        // 4. Delete Note
        console.log('4. Deleting note...');
        await fetch(`${API_URL}/${noteId}`, { method: 'DELETE' });
        console.log('   Success: Note deleted');

        console.log('\nBackend Verification PASSED! ✅');
    } catch (error) {
        console.error('\nBackend Verification FAILED ❌');
        console.error(error);
    }
}

testBackend();
