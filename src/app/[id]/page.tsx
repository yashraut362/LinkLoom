"use client"
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
    // Add a state variable to manage the loading state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://linkloom.netlify.app/api/${params.id}`) // Use 'params.slug' instead of 'params.id'
            .then((res) => {
                const fullLink = res?.data?.result?.fullLink;
                if (fullLink) {
                    if (fullLink.includes("http://") || fullLink.includes("https://")) {
                        window.open(fullLink, "_blank");
                    } else {
                        window.open("https://" + fullLink, "_blank");
                    }

                } else {
                    alert("Full link not found");
                }
            })
            .catch((err) => {
                console.log(err)
                console.error(err);
                alert("Something went wrong");
            })
            .finally(() => {
                // Set loading to false after the request is complete
                setLoading(false);
            });
    }, [params.id]); // Add 'params.slug' as a dependency

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black">
            {loading ? (
                <span className="loader"></span>
            ) : (
                // Render your content when loading is complete
                // You can add your content here
                <div>Content loaded</div>
            )}
        </div>
    );
}
